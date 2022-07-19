import { Grid, ColDef, GridOptions, IServerSideDatasource, GetRowIdParams } from '@ag-grid-community/core'

const columnDefs: ColDef[] = [{ field: 'product' }, { field: 'value' }]

const gridOptions: GridOptions = {
  defaultColDef: {
    width: 250,
    resizable: true,
  },
  rowSelection: 'multiple',
  columnDefs: columnDefs,
  // use the enterprise row model
  rowModelType: 'serverSide',
  animateRows: true,
  asyncTransactionWaitMillis: 4000,
  onGridReady: (params) => {
    setupData()

    var dataSource: IServerSideDatasource = {
      getRows: (params2) => {
        var rowData = allServerSideData.slice()
        setTimeout(function () {
          params2.success({ rowData: rowData })
        }, 200)
      },
    }

    params.api.setServerSideDatasource(dataSource)
  },
  getRowId: (params: GetRowIdParams) => {
    return params.data.product
  },
}

var products = ['Palm Oil', 'Rubber', 'Wool', 'Amber', 'Copper']

var newProductSequence = 0

var all_products = [
  'Palm Oil',
  'Rubber',
  'Wool',
  'Amber',
  'Copper',
  'Lead',
  'Zinc',
  'Tin',
  'Aluminium',
  'Aluminium Alloy',
  'Nickel',
  'Cobalt',
  'Molybdenum',
  'Recycled Steel',
  'Corn',
  'Oats',
  'Rough Rice',
  'Soybeans',
  'Rapeseed',
  'Soybean Meal',
  'Soybean Oil',
  'Wheat',
  'Milk',
  'Coca',
  'Coffee C',
  'Cotton No.2',
  'Sugar No.11',
  'Sugar No.14',
]

var allServerSideData: any[] = []

function setupData() {
  products.forEach(function (product, index) {
    allServerSideData.push({
      product: product,
      value: Math.floor(Math.random() * 10000),
    })
  })
}

function onBtAdd() {
  var newProductName =
    all_products[Math.floor(all_products.length * Math.random())]
  var newItem = {
    product: newProductName + ' ' + newProductSequence++,
    value: Math.floor(Math.random() * 10000),
  }
  allServerSideData.push(newItem)
  var tx = {
    add: [newItem],
  }
  gridOptions.api!.applyServerSideTransactionAsync(tx, function (res) {
    console.log('Transaction "' + newProductName + '": status = ' + res.status)
  })
}

function onBtFlush() {
  gridOptions.api!.flushServerSideAsyncTransactions()
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
})
