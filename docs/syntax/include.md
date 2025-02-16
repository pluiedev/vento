# Include

Use `{{ include [filename] }}` to insert other templates in place. Vento will
look for the included file in the `includes` folder.
([See configuration](../get-started/2-configuration.md)).

```vento
{{ include "filename.vto" }}
```

Use relative paths to include files relative to the current template:

```vento
{{ include "./filename.vto" }}
```

The file name can be any JavaScript expression, useful if you want to include
files dynamically:

```vento
{{ include `${name}.vto` }}
```

## Data

The included file inherits the same data as the main file. But you can add
additional data by passing an object after the file name.

```vento
{{ include "./filename.vto" { name: "Óscar" } }}
```
