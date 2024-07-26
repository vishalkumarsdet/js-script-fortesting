var cursor = db.rgp.gameAction.aggregate([
    {
      $match:
       
        {
          createdTime: {
            $gte: new ISODate("2024-02-13T00:00:00Z"),
            $lte: new ISODate("2024-07-13T00:00:00Z")
          },
          actionType: "RETURN",
          gameId: {
            $in: ["3000103"]
          },
          partnerId: {
            $in: ["winnabunch"]
          }
        }
    },
    {
      $project:
        {
          _id: 1,
          parentTransactionId: 1,
          amount: 1
        }
    },
    {
          $addFields: {
              id_string: { $toString: "$_id"}
          }
    },
    {
      $lookup:
        {
          from: "gameHistory",
          localField: "id_string",
          foreignField: "transactionID",
          as: "result"
        }
    },
    {
      $unwind:
        {
          path: "$result"
        }
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            {
              historyId: "$result._id"
            },
            {
              createdTime: "$result.createdTime"
            },
            {
              description: "$result.description"
            },
            {
              errorMessage: "$result.errorMessage"
            },
            {
              gameId: "$result.gameId"
            },
            {
              gameOutcome: "$result.gameOutcome"
            },
            {
              gameRoundStatus:
                "$result.gameRoundStatus"
            },
            {
              gameSessionId: "$result.gameSessionId"
            },
            {
              partnerId: "$result.partnerId"
            },
            {
              playerToken: "$result.playerToken"
            },
            {
              playerTokenNCube:
                "$result.playerTokenNCube"
            },
            {
              transactionID: "$result.transactionID"
            },
            {
              parentTransactionId:
                "$parentTransactionId"
            },
            {
              amount: "$amount"
            }
          ]
        }
      }
    }
  ]);
  var result = cursor.toArray();
  printjson(result);