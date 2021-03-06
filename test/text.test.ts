import { Text } from '../src';

interface TextTests {
  [name: string]: Array<{
    expected: number | string | string[];
    builder: () => any;
    raw?: boolean;
  }>;
}

const tests: TextTests = {
  'can be stringified': [
    {
      expected: 'Hello there!',
      builder: () => Text.make('Hello there!'),
    },
  ],

  'can be appended text to': [
    {
      expected: 'Hello!',
      builder: () => Text.make('Hel').append('lo!'),
    },
  ],

  'can be prepended text to': [
    {
      expected: 'Hello world',
      builder: () => Text.make('world').prepend('Hello '),
    },
  ],

  'can be appended a line to': [
    {
      expected: 'Line 1\nLine 2',
      builder: () => Text.make('Line 1').appendLine('Line 2'),
    },
  ],

  'can be prepended a line to': [
    {
      expected: 'Line 2\nLine 1',
      builder: () => Text.make('Line 1').prependLine('Line 2'),
    },
  ],

  'can be appended multiple lines to': [
    {
      expected: 'Line 1\nLine 2\nLine 3',
      builder: () => Text.make('Line 1').appendLines('Line 2', 'Line 3'),
    },
  ],

  'adds a line return between the existing text and the prepended lines': [
    {
      expected: 'Line 1\nLine 2',
      builder: () => Text.make('Line 2').prependLines('Line 1'),
    },
  ],

  'does not add a line return when prepending a line on an empty text': [
    {
      expected: 'Line 1',
      builder: () => Text.make().prependLines('Line 1'),
    },
  ],

  'can be prepended multiple lines to': [
    {
      expected: 'Line 1\nLine 2\nLine 3',
      builder: () => Text.make('Line 3').prependLines('Line 1', 'Line 2'),
    },
  ],

  'can be concatenated': [
    {
      expected: 'Hello there',
      builder: () => Text.make('Hello').concat(' there'),
    },
  ],

  'can be added spaces to': [
    {
      expected: 'Hello !',
      builder: () => Text.make('Hello').space().append('!'),
    },
  ],

  'can be added new lines to': [
    {
      expected: 'Line 1\nLine 2',
      builder: () => Text.make('Line 1').nl().append('Line 2'),
    },
  ],

  'can be added the specified amount of characters': [
    {
      expected: 'aaa',
      builder: () => Text.make().times('a', 3),
    },
  ],

  'returns the content before the first occurrence': [
    {
      expected: 't',
      builder: () => Text.make('test').before('e'),
    },
  ],

  'returns the content before the last occurrence': [
    {
      expected: 'hel',
      builder: () => Text.make('hello').beforeLast('l'),
    },
  ],

  'returns the content after the first occurrence': [
    {
      expected: 'lo',
      builder: () => Text.make('hello').after('l'),
    },
    {
      expected: ' world',
      builder: () => Text.make('hello world').after('hello'),
    },
  ],

  'returns the content after the last occurrence': [
    {
      expected: 'o',
      builder: () => Text.make('hello').afterLast('l'),
    },
  ],

  'returns the content between two values': [
    {
      expected: 'ell',
      builder: () => Text.make('hello').between('h', 'o'),
    },
    {
      expected: 'abbc',
      builder: () => Text.make('aabbcc').between('a', 'c'),
    },
  ],

  'returns the same when calling `between` if one value is empty': [
    {
      expected: 'ello',
      builder: () => Text.make('hello').between('h', 'p'),
    },
    {
      expected: 'lo',
      builder: () => Text.make('hello').between('l', 'p'),
    },
    {
      expected: 'h',
      builder: () => Text.make('hello').between('p', 'e'),
    },
  ],

  'returns the content inside two values': [
    {
      expected: 'bb',
      builder: () => Text.make('aabbcc').inside('a', 'c'),
    },
    {
      expected: 'hello world',
      builder: () => Text.make('{{hello world}}').inside('{', '}'),
    },
  ],

  'finishes a string with the given value': [
    {
      expected: 'hello',
      builder: () => Text.make('hell').finish('o'),
    },
    {
      expected: 'hello',
      builder: () => Text.make('hello').finish('o'),
    },
  ],

  'starts a string with the given value': [
    {
      expected: '/hello/',
      builder: () => Text.make('hello/').start('/'),
    },
    {
      expected: '/hello/',
      builder: () => Text.make('/hello/').start('/'),
    },
  ],

  'determines if a string is an UUID': [
    {
      expected: 'false',
      builder: () => Text.make('hello').isUuid(),
    },
    {
      expected: 'true',
      builder: () => Text.make('52dc5778-1288-400d-b400-821b7beabd92').isUuid(), // uuid v4
    },
    {
      expected: 'true',
      builder: () => Text.make('0630c1d6-8fab-11ea-bc55-0242ac130003').isUuid(), // uuid v1
    },
  ],

  'extends actual string methods': [
    {
      expected: 'hello',
      builder: () => Text.make('  hello').trimLeft(),
    },
    {
      expected: '111',
      builder: () => Text.make('1').repeat(3),
    },
    {
      expected: 'a',
      builder: () => Text.make('cat').charAt(1),
    },
    {
      expected: 'Hewwo',
      builder: () => Text.make('Hello').replace(/l/g, 'w'),
    },
  ],

  'extracts words from string': [
    {
      expected: ['hello', 'world'],
      builder: () => Text.make('hello world').words(),
      raw: true,
    },
    {
      expected: ['hello', '&', 'world'],
      builder: () => Text.make('hello & world').words(/[^, ]+/g),
      raw: true,
    },
  ],

  'changes the case of the first character to upper': [
    {
      expected: 'Hello',
      builder: () => Text.make('hello').upperFirst(),
    },
    {
      expected: 'Hello',
      builder: () => Text.make('Hello').upperFirst(),
    },
    {
      expected: ' hello',
      builder: () => Text.make(' hello').upperFirst(),
    },
  ],

  'changes the case of the first character to lower': [
    {
      expected: 'hello',
      builder: () => Text.make('hello').lowerFirst(),
    },
    {
      expected: 'hello',
      builder: () => Text.make('Hello').lowerFirst(),
    },
    {
      expected: ' hello',
      builder: () => Text.make(' hello').lowerFirst(),
    },
  ],

  'converts to kebab-case': [
    {
      expected: 'hello-world',
      builder: () => Text.make('Hello World').kebabCase(),
    },
    {
      expected: 'hello-world',
      builder: () => Text.make('Hello, World!').kebabCase(),
    },
    {
      expected: 'hello-world',
      builder: () => Text.make('   Hello, World!   ').kebabCase(),
    },
    {
      expected: 'hello-world',
      builder: () => Text.make('hello_world').kebabCase(),
    },
    {
      expected: 'hello-world',
      builder: () => Text.make('HelloWorld').kebabCase(),
    },
    {
      expected: 'hello-world',
      builder: () => Text.make('hello-world').kebabCase(),
    },
  ],

  'converts to camelCase': [
    {
      expected: 'helloWorld',
      builder: () => Text.make('Hello World').camelCase(),
    },
    {
      expected: 'helloWorld',
      builder: () => Text.make('Hello, World!').camelCase(),
    },
    {
      expected: 'helloWorld',
      builder: () => Text.make('   Hello, World!   ').camelCase(),
    },
    {
      expected: 'helloWorld',
      builder: () => Text.make('hello_world').camelCase(),
    },
    {
      expected: 'helloWorld',
      builder: () => Text.make('HelloWorld').camelCase(),
    },
    {
      expected: 'helloWorld',
      builder: () => Text.make('hello-world').camelCase(),
    },
  ],

  'converts to snake_case': [
    {
      expected: 'hello_world',
      builder: () => Text.make('Hello World').snakeCase(),
    },
    {
      expected: 'hello_world',
      builder: () => Text.make('Hello, World!').snakeCase(),
    },
    {
      expected: 'hello_world',
      builder: () => Text.make('   Hello, World!   ').snakeCase(),
    },
    {
      expected: 'hello_world',
      builder: () => Text.make('hello_world').snakeCase(),
    },
    {
      expected: 'hello_world',
      builder: () => Text.make('HelloWorld').snakeCase(),
    },
    {
      expected: 'hello_world',
      builder: () => Text.make('hello-world').snakeCase(),
    },
  ],

  'converts to PascalCase': [
    {
      expected: 'HelloWorld',
      builder: () => Text.make('Hello World').pascalCase(),
    },
    {
      expected: 'HelloWorld',
      builder: () => Text.make('Hello, World!').pascalCase(),
    },
    {
      expected: 'HelloWorld',
      builder: () => Text.make('   Hello, World!   ').pascalCase(),
    },
    {
      expected: 'HelloWorld',
      builder: () => Text.make('hello_world').pascalCase(),
    },
    {
      expected: 'HelloWorld',
      builder: () => Text.make('HelloWorld').pascalCase(),
    },
    {
      expected: 'HelloWorld',
      builder: () => Text.make('hello-world').pascalCase(),
    },
  ],

  'trims lines from template literals': [
    {
      expected: 'Hello\nfrom\ntemplate\nliterals',
      builder: () =>
        Text.make().trimLines(`
					Hello
					from
					template
					literals
				`),
    },
  ],

  'transforms text if conditiojns are met': [
    {
      expected: '',
      builder: () => Text.make().appendIf(false, 'Hello world'),
    },
    {
      expected: 'Hello world',
      builder: () => Text.make().appendIf(true, 'Hello world'),
    },
    {
      expected: '',
      builder: () => Text.make().lineIf(false, 'Hello world'),
    },
    {
      expected: '\nHello world',
      builder: () => Text.make().lineIf(true, 'Hello world'),
    },
    {
      expected: '',
      builder: () => Text.make().prependIf(false, 'Hello world'),
    },
    {
      expected: 'Hello world',
      builder: () => Text.make().prependIf(true, 'Hello world'),
    },
  ],

  'maps text': [
    {
      expected: 'H E L L O',
      builder: () =>
        Text.make('Hello').map((char, index, array) => {
          return char.upper().appendIf(index < array.length - 1, ' ');
        }),
    },
  ],

  'loops through text without modifying it': [
    {
      expected: 'Hello',
      builder: () => Text.make('Hello').each(char => char.upper()),
    },
  ],

  'loops through text and calls the callback': [
    {
      expected: 'Hello',
      builder: () => {
        const text = Text.make('Hello');
        const callback = jest.fn(c => c.upper());

        text.each(callback);

        expect(callback.mock.calls.length).toBe(5);
        expect(callback.mock.results.map(r => r.value.toString()).join('')).toBe('HELLO');

        return text;
      },
    },
  ],

  'gets the correct length of the text': [
    {
      expected: 5,
      builder: () => Text.make('hello').length,
      raw: true,
    },
    {
      expected: 0,
      builder: () => Text.make().length,
      raw: true,
    },
  ],
};

describe('Text Builder', () => {
  Object.entries(tests).forEach(([title, tests]) => {
    test(title, () => {
      tests.forEach(({ builder, expected, raw }) => {
        expect(raw ? builder() : builder().toString()).toStrictEqual(expected);
      });
    });
  });
});
