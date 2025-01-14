import type { Token } from "../src/tokenizer.ts";
import type { Environment } from "../src/environment.ts";

export default function () {
  return (env: Environment) => {
    env.tags.push(layoutTag);
  };
}

function layoutTag(
  env: Environment,
  code: string,
  output: string,
  tokens: Token[],
): string | undefined {
  if (!code.startsWith("layout ")) {
    return;
  }

  const match = code?.match(
    /^layout\s+([^{]+|`[^`]+`)+(?:\{([\s|\S]*)\})?$/,
  );

  if (!match) {
    throw new Error(`Invalid wrap: ${code}`);
  }

  const [_, file, data] = match;

  const varname = "__content";
  const compiled: string[] = [];
  const compiledFilters = env.compileFilters(tokens, varname);

  compiled.push("{");
  compiled.push(`var ${varname} = "";`);
  compiled.push(...env.compileTokens(tokens, varname, ["/layout"]));

  if (tokens.length && (tokens[0][0] !== "tag" || tokens[0][1] !== "/layout")) {
    throw new Error(`Missing closing tag for layout tag: ${code}`);
  }

  tokens.shift();

  compiled.push(`${varname} = ${compiledFilters};`);

  compiled.push(
    `__tmp = await __env.run(${file},
      {...__data${data ? `, ${data}` : ""}, content: ${varname}},
      __file
    );
    ${output} += __tmp.content;`,
  );

  compiled.push("}");
  return compiled.join("\n");
}
