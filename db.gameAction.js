db.gameAction.aggregate([
    {
      $match:
       
        {
          createdTime: {
            $gte: new ISODate("2024-02-13T00:00:00"),
            $lte: new ISODate("2024-07-13T00:00:00")
          },
          actionType: "RETURN",
          gameId: {
            $in: ["3003002"]
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
    }
]);