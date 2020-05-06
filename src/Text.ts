export type Input = string | number | Text;
export type Fragment = string;

/**
 * Builds a string, fluently.
 */
export class Text {
  private _fragments: Fragment[];

  /*
  |--------------------------------------------------------------------------
  | Constructors
  |--------------------------------------------------------------------------
  */

  /**
   * Creates a new instance of the builder.
   */
  constructor(...fragments: Input[]) {
    this._fragments = this.fragmentify(fragments);
  }

  /**
   * Creates a new instance of the builder.
   */
  static make(...fragments: Input[]): Text {
    return new Text(...fragments);
  }

  /**
   * Converts accepted inputs into workable fragments.
   */
  private fragmentify(input: Input[]): Fragment[] {
    return input.map(fragment => fragment.toString());
  }

  /*
  |--------------------------------------------------------------------------
  | Fluent methods
  |--------------------------------------------------------------------------
  */

  /**
   * Adds a space character.
   *
   * @param count Amount of spaces to add.
   */
  space(count: number = 1): this {
    for (let i = 0; i < Math.max(count, 1); i++) {
      this._fragments.push(' ');
    }

    return this;
  }

  /**
   * Appends the given input to the builder.
   */
  append(...input: Input[]): this {
    this._fragments.push(...this.fragmentify(input));

    return this;
  }

  /*
  |--------------------------------------------------------------------------
  | Serialization
  |--------------------------------------------------------------------------
  */

  /**
   * Returns each fragment of this builder as a string, separated by the given string.
   */
  join(separator: string = ''): string {
    return this._fragments.join(separator);
  }

  /**
   * Returns the builder as a string.
   */
  toString(): string {
    return this.join();
  }
}
