import { Grid, GridOptions, GetRowIdParams, IServerSideDatasource } from '@ag-grid-community/core'
declare var FakeServer: any;
const gridOptions: GridOptions<IOlympicData> = {
  columnDefs: [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'sport' },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true,
  },
  autoGroupColumnDef: {
    flex: 1,
    minWidth: 180,
  },

  getRowId: (params: GetRowIdParams) => {
    // use country for group level ids, or the id we assigned for leaf level
    var data = params.data;
    return data.id!=null ? data.id : data.country;
  },

  // use the server-side row model
  rowModelType: 'serverSide',
  serverSideInfiniteScroll: true,

  // allow multiple leaf row selections
  rowSelection: 'multiple',

  animateRows: true,
  suppressAggFuncInHeader: true,
  // debug: true,
}

function getServerSideDatasource(server: any): IServerSideDatasource {
  return {
    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request)

      var response = server.getData(params.request)

      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({ rowData: response.rows, rowCount: response.lastRow })
        } else {
          // inform the grid request failed
          params.fail()
        }
      }, 200)
    },
  }
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(function (data) {

      // assign a unique ID to each data item
      data.forEach(function (item: any, index: number) {
        item.id = index;
      });

      // setup the fake server with entire dataset
      var fakeServer = new FakeServer(data)

      // create datasource with a reference to the fake server
      var datasource = getServerSideDatasource(fakeServer)

      // register the datasource with the grid
      gridOptions.api!.setServerSideDatasource(datasource)
    })
})
