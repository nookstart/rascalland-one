-- Create table migration
CREATE TABLE IF NOT EXISTS public.catalog (
    uid UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    image_hash TEXT NOT NULL,
    image_link TEXT NOT NULL,
    metadata_hash TEXT NOT NULL,
    metadata_link TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.catalog ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access" ON public.catalog
    FOR SELECT
    USING (true);

-- Optional: Add comments for clarity
COMMENT ON TABLE public.catalog IS 'Stores asset information with integrity hashes';
COMMENT ON COLUMN public.catalog.image_hash IS 'Hash value for image content verification';
COMMENT ON COLUMN public.catalog.metadata_hash IS 'Hash value for metadata content verification';

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_catalog_updated_at
    BEFORE UPDATE ON public.catalog
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();