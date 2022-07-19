---
title: "Typescript Generics"
---

AG Grid supports Typescript [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) for row data and cell values. This leads to greatly improved developer experience via code completion and compile time validation of row data and cell value properties.

## Row Data: \<TData\>

Provide a Typescript interface for row data to the grid to enable auto-completion and type-checking whenever properties are accessed from a row `data` variable. There are multiple ways to configure the generic interface: via the `GridOptions<TData>` interface, via other individual interfaces and finally via framework components.

In the examples below we will use the `ICar` interface to represent row data.

```ts 
// Row Data interface
interface ICar {
    make: string;
    model: string;
    price: number;
}
```

### Configure via GridOptions

Set the row data type on the grid options interface via `GridOptions<ICar>`. The `ICar` interface will then be used throughout the grid options whenever row data is present. This is true for: properties, callbacks, events and the gridApi.

```ts 
// Pass ICar to GridOptions as a generic
const gridOptions: GridOptions<ICar> = {
    // rowData is typed as ICar[]
    rowData: [ { make: 'Ford', model: 'Galaxy', price: 20000 } ],

    // Callback with params type: GetRowIdParams<ICar>
    getRowId: (params) => {
        // params.data : ICar
        return params.data.make + params.data.model;
    },

    // Event with type: RowSelectedEvent<ICar>
    onRowSelected: (event) => {
        // event.data: ICar | undefined
        if (event.data) {
            const price = event.data.price;
        }
    }
}

// Grid Api methods use ICar interface
function onSelection() {
  // api.getSelectedRows() : ICar[]
  const cars: ICar[] = gridOptions.api!.getSelectedRows();  
}
```

[[note]]
| You do not need to explicitly type callbacks and events that are defined as part of `GridOptions`. Typescript will correctly pass the generic type down the interface hierarchy.

### Configure via Interfaces

Each interface that accepts a generic type of `TData` can also be configured individually. For example, an event handler function can accept the generic parameter on the event `RowSelectedEvent`.

```ts
function onRowSelected(event: RowSelectedEvent<ICar>) {
    if (event.data) {
        // event.data: ICar | undefined
        const price = event.data.price;
    }
}
```

[[only-angular]]
|### Configure via Component
|
|The `<ag-grid-angular>` component is defined as `AgGridComponent<TData = any>`. To activate the generic parameter, configure any valid Input property with the row data interface.
|
|For example, type the `rowData` property in your component as `rowData: ICar[]`. 
|
|```ts
|const rowData: ICar[] = [...];
|```
|
|Set this on your component template `[rowData]="rowData"`. This assigns `ICar` to `TData` for the component.
|
|```html
|<ag-grid-angular 
|    [rowData]="rowData"    
|    (rowSelected)="onRowSelected($event)"
|></ag-grid-angular>
|```
|
|This generic parameter is used for all other Inputs and Outputs ensuring consistency across the component. If `(rowSelected)` is defined with a different interface the application code will fail to compile.
|
|```ts
|// ERROR: INotACar is not assignable to ICar
|onRowSelected(event: RowSelectedEvent<INotACar>) {}
|
|// SUCCESS: ICar is correct interface
|onRowSelected(event: RowSelectedEvent<ICar>) {}
|```

[[only-react]]
|### Configure via Component
|
|The `<AgGridReact>` component accepts a generic parameter as `<AgGridReact<ICar>>`.
|
|```tsx
|<AgGridReact<ICar>
|    ref={gridRef}
|    rowData={rowData}
|    onRowSelected={onRowSelected}
|>
|</AgGridReact>
|```
|
|This ensures all the props defined on `<AgGridReact>` conform to the `ICar` interface. These props can be defined with types like this.
|
|```ts
|const gridRef = useRef<AgGridReact<ICar>>(null);
|
|const [rowData, setRowData] = useState<ICar[]>([ ... ]);
|
|const onRowSelected = useCallback((event: RowSelectedEvent<ICar>) => { ... }, [])
|```

### Type: TData | undefined

For a number of events and callbacks, when a generic interface is provided, the `data` property is typed as `TData | undefined` instead of `any`. The undefined is required because it is possible for the `data` property to be undefined under certain grid configurations. 

A good example of this is [Row Grouping](/grouping). The `onRowSelected` event is fired for both leaf and group rows. Data is only present on leaf nodes and so the event should be written to handle cases when `data` is undefined for groups.

```ts 
function onRowSelected(event: RowSelectedEvent<ICar>) {
    // event.data is typed as ICar | undefined
    if (event.data) {
        // Leaf row with data
        const price = event.data.price;
    } else {
        // This is a group row
    }
}
```

## Cell Value: \<TValue\>

When working with cell values it is possible to provide a generic interface for the `value` property. While this will often be a primitive type, such as `string` or `number`, it can also be a complex type. Using a generic for the cell value will enable auto-completion and type-checking.

### Configure via Interfaces

The generic parameter `TValue` needs to be explicitly provided to each interface. Here is an example of a `valueFormatter` for the price column. The `params.value` property is correctly typed as a `number` due to typing the params argument as `ValueFormatterParams<ICar, number>`.

```ts
const colDefs: ColDef<ICar>[] = [
     {
        field: 'price',
        valueFormatter: (params: ValueFormatterParams<ICar, number>) => {
            // params.value : number
            return "£" + params.value;
        }
    }
];
```

The `TValue` generic type is also supported for cell renderers / editors by `ICellRendererParams<TData, TValue>` and `ICellEditorParams<TData, TValue>` respectively.

### Typed: TValue | undefined

For a number of events and callbacks when a generic interface is provided the `value` property is typed as `TValue | undefined` instead of `any`. This is because it is possible for the `value` property to be undefined under certain grid configurations. 

## Generic Type Example

Inspect the code in the following example or open in Plunker to experiment with generic typing yourself.

<grid-example title='Generic Types' name='generic' type='generated' options='{ "exampleHeight": 500 }'></grid-example>

## Fallback Default

If generic interfaces are not provided then the grid will use the default type of `any`. This means that generics in AG Grid are completely optional. GridOptions is defined as `GridOptions<TData = any>`, so if a generic parameter is not provided then `any` is used in its place for row data properties. 

Likewise for cell values, if a generic parameter is not provided, `any` is used for the value property. For example, cell renderer params are defined as `ICellRendererParams<TData = any, TValue = any>`.
