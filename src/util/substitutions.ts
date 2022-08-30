import crypto from "crypto";
import Document from "util/dynamoDB";
import ERROR_CODES from "util/errorCodes";
import { Substitution, APICallResponse } from "types";

class Substitutions {
  get(callback: (data: Substitution[] | APICallResponse) => void) {
    Document.scan(
      { TableName: process.env.AWS_DYNAMODB_TABLE, Select: "ALL_ATTRIBUTES" },
      (err, data) => {
        if (err)
          return callback({
            success: false,
            error: ERROR_CODES.DATABASE_ERROR + err,
          });

        callback(data.Items as Substitution[]);
      }
    );
  }

  add(substitution: Substitution, callback: (result: APICallResponse) => void) {
    const id = crypto
      .createHash("md5")
      .update(String(new Date().getTime()))
      .digest("hex");

    const Item = {
      id,
      ...substitution,
    };

    Document.put({ TableName: process.env.AWS_DYNAMODB_TABLE, Item }, (err) => {
      if (err)
        return callback({
          success: false,
          error: ERROR_CODES.DATABASE_ERROR + err,
        });

      return callback({
        success: true,
        message: "Sikeres hozzáadás!",
        id,
      });
    });
  }

  update(
    id: string,
    newSubstitution: Substitution,
    callback: (result: APICallResponse) => void
  ) {
    const Item = {
      id,
      ...newSubstitution,
    };

    // Easier Syntax than using Document.update
    Document.delete(
      { TableName: process.env.AWS_DYNAMODB_TABLE, Key: { id } },
      (err) => {
        if (err)
          return callback({
            success: false,
            error: ERROR_CODES.DATABASE_ERROR + err,
          });
      }
    );

    // toods
    // it does remove the old one, but doesnt create a new
    // plus error: currently you cannot update an item that is created in the same session

    Document.put({ TableName: process.env.AWS_DYNAMODB_TABLE, Item }, (err) => {
      if (err)
        return callback({
          success: false,
          error: ERROR_CODES.DATABASE_ERROR + err,
        });
    });

    return callback({
      success: true,
      message: "Sikeres módosítás!",
    });
  }

  remove(id: string, callback: (result: APICallResponse) => void) {
    Document.delete(
      { TableName: process.env.AWS_DYNAMODB_TABLE, Key: { id } },
      (err) => {
        if (err)
          return callback({
            success: false,
            error: ERROR_CODES.DATABASE_ERROR + err,
          });
      }
    );

    return callback({
      success: true,
      message: "Sikeres törlés!",
    });
  }
}

const substitutions = new Substitutions();
export { substitutions };

export default Substitutions;
