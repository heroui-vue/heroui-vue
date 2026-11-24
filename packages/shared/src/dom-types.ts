// Copied from react-spectrum/packages/@react-types

export type ValidationState = "valid" | "invalid";

export type ValidationError = string | string[];
export type ValidationErrors = Record<string, ValidationError>;
export type ValidationFunction<T> = (value: T) => ValidationError | true | null | undefined;

export interface Validation<T = unknown> {
  /** Whether user input is required on the input before form submission. */
  isRequired?: boolean;
  /** Whether the input value is invalid. */
  isInvalid?: boolean;
  /** @deprecated Use `isInvalid` instead. */
  validationState?: ValidationState;
  /**
   * Whether to use native HTML form validation to prevent form submission
   * when the value is missing or invalid, or mark the field as required
   * or invalid via ARIA.
   *
   * @default 'aria'
   */
  validationBehavior?: "aria" | "native";
  /**
   * A function that returns an error message if a given value is invalid.
   * Validation errors are displayed to the user when the form is submitted
   * if `validationBehavior="native"`. For realtime validation, use the `isInvalid`
   * prop instead.
   */
  validate?: (value: T) => ValidationError | true | null | undefined;
}

export interface AriaLabelingProps {
  /**
   * Defines a string value that labels the current element.
   */
  "aria-label"?: string;

  /**
   * Identifies the element (or elements) that labels the current element.
   */
  "aria-labelledby"?: string;

  /**
   * Identifies the element (or elements) that describes the object.
   */
  "aria-describedby"?: string;

  /**
   * Identifies the element (or elements) that provide a detailed, extended description for the
   * object.
   */
  "aria-details"?: string;
}

export interface AriaValidationProps {
  // https://www.w3.org/TR/wai-aria-1.2/#aria-errormessage
  /**
   * Identifies the element that provides an error message for the object.
   */
  "aria-errormessage"?: string;
}
