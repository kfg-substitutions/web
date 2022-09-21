import crypto from "crypto";
import Document from "util/dynamoDB";
import ERROR_CODES from "util/errorCodes";
import { Substitution, APICallResponse } from "types";

class Substitutions {
  get(callback: (data: APICallResponse) => void) {
    Document.scan(
      {
        TableName: process.env.APP_AWS_DYNAMODB_TABLE,
        Select: "ALL_ATTRIBUTES",
      },
      (err, data) => {
        if (err)
          return callback({
            success: false,
            error: ERROR_CODES.DATABASE_ERROR + err,
          });

        callback({ success: true, message: data.Items as Substitution[] });
      }
    );
  }

  add(substitution: Substitution, callback: (result: APICallResponse) => void) {
    const id = crypto.randomUUID();

    // todo: id check until a unique is generated

    const Item = {
      id,
      ...substitution,
    };

    Document.put(
      { TableName: process.env.APP_AWS_DYNAMODB_TABLE, Item },
      (err) => {
        if (err)
          return callback({
            success: false,
            error: ERROR_CODES.DATABASE_ERROR + err,
          });

        callback({
          success: true,
          message: "Sikeres hozzáadás!",
          id,
        });
      }
    );
  }

  update(
    id: string,
    newSubstitution: Substitution,
    callback: (result: APICallResponse) => void
  ) {
    // _class and _hour is workaround for dynamoDB keyword preservation rule
    Document.update(
      {
        TableName: process.env.APP_AWS_DYNAMODB_TABLE,
        Key: { id },
        UpdateExpression:
          "set substitutor = :substitutor, substituted = :substituted, #hour = :hour, #class = :class, subject = :subject, room = :room, note = :note",
        ExpressionAttributeNames: {
          "#hour": "hour",
          "#class": "class",
        },
        ExpressionAttributeValues: {
          ":substitutor": newSubstitution.substitutor,
          ":substituted": newSubstitution.substituted,
          ":hour": newSubstitution.hour,
          ":class": newSubstitution.class,
          ":subject": newSubstitution.subject,
          ":room": newSubstitution.room,
          ":note": newSubstitution.note,
        },
      },
      (err) => {
        if (err)
          return callback({
            success: false,
            error: ERROR_CODES.DATABASE_ERROR + err,
          });

        callback({
          success: true,
          message: "Sikeres módosítás!",
        });
      }
    );
  }

  remove(id: string, callback: (result: APICallResponse) => void) {
    Document.delete(
      { TableName: process.env.APP_AWS_DYNAMODB_TABLE, Key: { id } },
      (err) => {
        if (err)
          return callback({
            success: false,
            error: ERROR_CODES.DATABASE_ERROR + err,
          });

        callback({
          success: true,
          message: "Sikeres törlés!",
        });
      }
    );
  }
}

const substitutions = new Substitutions();
export { substitutions };

export default Substitutions;
