/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/rascalland_rename_util.json`.
 */
export type RascallandRenameUtil = {
  "address": "7rapy8jMXsdRKqtEzyQhudoVsEb3Cs8nNkzeBVwZ2eCh",
  "metadata": {
    "name": "rascallandRenameUtil",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Rascal Land rename utility"
  },
  "instructions": [
    {
      "name": "createRenameTicket",
      "discriminator": [
        26,
        126,
        63,
        94,
        70,
        191,
        27,
        57
      ],
      "accounts": [
        {
          "name": "nftMint"
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "renameTicket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  105,
                  99,
                  107,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "nftMint"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "renameNft",
      "discriminator": [
        72,
        7,
        56,
        108,
        56,
        138,
        169,
        122
      ],
      "accounts": [
        {
          "name": "mint"
        },
        {
          "name": "token"
        },
        {
          "name": "metadata",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "const",
                "value": [
                  11,
                  112,
                  101,
                  177,
                  227,
                  209,
                  124,
                  69,
                  56,
                  157,
                  82,
                  127,
                  107,
                  4,
                  195,
                  205,
                  88,
                  184,
                  108,
                  115,
                  26,
                  160,
                  253,
                  181,
                  73,
                  182,
                  209,
                  188,
                  3,
                  248,
                  41,
                  70
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "account",
              "path": "tokenMetadataProgram"
            }
          }
        },
        {
          "name": "updateAuthority",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "sysvarInstructions",
          "address": "Sysvar1nstructions1111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "newName",
          "type": "string"
        },
        {
          "name": "newUri",
          "type": "string"
        }
      ]
    },
    {
      "name": "renameWithTicket",
      "discriminator": [
        11,
        231,
        203,
        48,
        169,
        132,
        76,
        70
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true,
          "relations": [
            "renameTicket"
          ]
        },
        {
          "name": "renameTicket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  105,
                  99,
                  107,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "nftMint"
              }
            ]
          }
        },
        {
          "name": "nftMint"
        },
        {
          "name": "metadata",
          "writable": true
        },
        {
          "name": "tokenMetadataProgram",
          "address": "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "sysvarInstructions",
          "address": "Sysvar1nstructions1111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "newName",
          "type": "string"
        },
        {
          "name": "newUri",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "renameTicket",
      "discriminator": [
        94,
        182,
        64,
        219,
        125,
        235,
        217,
        195
      ]
    }
  ],
  "types": [
    {
      "name": "renameTicket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nftMint",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
