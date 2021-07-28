import { isEmptyHandler } from "@helpers/utility";

export class Step2Validator {
  isHandleValid(__handle: string) {
    return isEmptyHandler(__handle, "Handle cannot be empty");
  }

  isFullNameValid(__fullName: string) {
    return isEmptyHandler(__fullName, "Full name cannot be empty");
  }

  isUniversityValid(__university: string) {
    return isEmptyHandler(__university, "University cannot be empty");
  }

  isBatchValid(__batch: number) {
    if (__batch) {
      return true;
    }

    if (isNaN(__batch)) {
      throw new Error("Enter a valid value for Batch");
    }
    throw new Error("Batch cannot be empty");
  }

  isShortBioValid(__shortBio: string) {
    return isEmptyHandler(__shortBio, "Short bio cannot be empty");
  }

  isImageValid(__image: File | undefined) {
    return isEmptyHandler(__image, "Image cannot be empty");
  }

  isValid(
    __handle: string,
    __fullName: string,
    __university: string,
    __batch: number,
    __shortBio: string,
    __image: File | undefined
  ) {
    return (
      this.isHandleValid(__handle) &&
      this.isFullNameValid(__fullName) &&
      this.isUniversityValid(__university) &&
      this.isBatchValid(__batch) &&
      this.isShortBioValid(__shortBio) &&
      this.isImageValid(__image)
    );
  }
}
