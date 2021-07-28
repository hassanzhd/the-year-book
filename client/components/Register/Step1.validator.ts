import { isEmptyHandler } from "@helpers/utility";

export class Step1Validator {
  isEmailValid(__email: string): boolean {
    return isEmptyHandler(__email, "Email cannot be empty");
  }

  isPasswordValid(__password: string): boolean {
    return isEmptyHandler(__password, "Password cannot be empty");
  }

  isValid(__email: string, __password: string): boolean {
    return this.isEmailValid(__email) && this.isPasswordValid(__password);
  }
}
