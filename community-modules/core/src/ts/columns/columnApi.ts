import { ColDef, ColGroupDef } from "../entities/colDef";
import { IHeaderColumn } from "../entities/iHeaderColumn";
import { ColumnModel, ColumnState, ApplyColumnStateParams } from "./columnModel";
import { ProvidedColumnGroup } from "../entities/providedColumnGroup";
import { ColumnGroup } from "../entities/columnGroup";
import { Column } from "../entities/column";
import { Autowired, Bean, PreDestroy } from "../context/context";
import { _ } from "../utils";
import { ColumnEventType } from "../events";

@Bean('columnApi')
export class ColumnApi {

    @Autowired('columnModel') private columnModel: ColumnModel;

    /** Gets the grid to size the columns to the specified width in pixels, e.g. `sizeColumnsToFit(900)`. To have the grid fit the columns to the grid's width, use the Grid API `gridApi.sizeColumnsToFit()` instead. */
    public sizeColumnsToFit(gridWidth: number): void {
        // AG-3403 validate that gridWidth is provided because this method has the same name as
        // a method on the grid API that takes no arguments, and it's easy to confuse the two
        if (typeof gridWidth === "undefined") {
            console.error('AG Grid: missing parameter to columnApi.sizeColumnsToFit(gridWidth)');
        }
        this.columnModel.sizeColumnsToFit(gridWidth, 'api');
    }
    /** Call this if you want to open or close a column group. */
    public setColumnGroupOpened(group: ProvidedColumnGroup | string, newValue: boolean): void { this.columnModel.setColumnGroupOpened(group, newValue, 'api'); }
    /** Returns the column group with the given name. */
    public getColumnGroup(name: string, instanceId?: number): ColumnGroup | null { return this.columnModel.getColumnGroup(name, instanceId); }
    /** Returns the provided column group with the given name. */
    public getProvidedColumnGroup(name: string): ProvidedColumnGroup | null { return this.columnModel.getProvidedColumnGroup(name); }

    /** Returns the display name for a column. Useful if you are doing your own header rendering and want the grid to work out if `headerValueGetter` is used, or if you are doing your own column management GUI, to know what to show as the column name. */
    public getDisplayNameForColumn(column: Column, location: string | null): string { return this.columnModel.getDisplayNameForColumn(column, location) || ''; }
    /** Returns the display name for a column group (when grouping columns). */
    public getDisplayNameForColumnGroup(columnGroup: ColumnGroup, location: string): string { return this.columnModel.getDisplayNameForColumnGroup(columnGroup, location) || ''; }

    /** Returns the column with the given `colKey`, which can either be the `colId` (a string) or the `colDef` (an object). */
    public getColumn(key: any): Column | null { return this.columnModel.getPrimaryColumn(key); }
    /** Returns all the columns, regardless of visible or not. */
    public getColumns(): Column[] | null { return this.columnModel.getAllPrimaryColumns(); }
    /** Applies the state of the columns from a previous state. Returns `false` if one or more columns could not be found. */
    public applyColumnState(params: ApplyColumnStateParams): boolean { return this.columnModel.applyColumnState(params, 'api'); }
    /** Gets the state of the columns. Typically used when saving column state. */
    public getColumnState(): ColumnState[] { return this.columnModel.getColumnState(); }
    /** Sets the state back to match the originally provided column definitions. */
    public resetColumnState(): void { this.columnModel.resetColumnState('api'); }
    /** Gets the state of the column groups. Typically used when saving column group state. */
    public getColumnGroupState(): { groupId: string, open: boolean }[] { return this.columnModel.getColumnGroupState(); }
    /** Sets the state of the column group state from a previous state. */
    public setColumnGroupState(stateItems: ({ groupId: string, open: boolean })[]): void { this.columnModel.setColumnGroupState(stateItems, 'api'); }
    /** Sets the state back to match the originally provided column definitions. */
    public resetColumnGroupState(): void { this.columnModel.resetColumnGroupState('api'); }

    /** Returns `true` if pinning left or right, otherwise `false`. */
    public isPinning(): boolean { return this.columnModel.isPinningLeft() || this.columnModel.isPinningRight(); }
    /** Returns `true` if pinning left, otherwise `false`. */
    public isPinningLeft(): boolean { return this.columnModel.isPinningLeft(); }
    /** Returns `true` if pinning right, otherwise `false`. */
    public isPinningRight(): boolean { return this.columnModel.isPinningRight(); }
    /** Returns the column to the right of the provided column, taking into consideration open / closed column groups and visible columns. This is useful if you need to know what column is beside yours e.g. if implementing your own cell navigation. */
    public getDisplayedColAfter(col: Column): Column | null { return this.columnModel.getDisplayedColAfter(col); }
    /** Same as `getVisibleColAfter` except gives column to the left. */
    public getDisplayedColBefore(col: Column): Column | null { return this.columnModel.getDisplayedColBefore(col); }
    /** Sets the visibility of a column. Key can be the column ID or `Column` object. */
    public setColumnVisible(key: string | Column, visible: boolean): void { this.columnModel.setColumnVisible(key, visible, 'api'); }
    /** Same as `setColumnVisible`, but provide a list of column keys. */
    public setColumnsVisible(keys: (string | Column)[], visible: boolean): void { this.columnModel.setColumnsVisible(keys, visible, 'api'); }
    /** Sets the column pinned / unpinned. Key can be the column ID, field, `ColDef` object or `Column` object. */
    public setColumnPinned(key: string | Column, pinned: string): void { this.columnModel.setColumnPinned(key, pinned, 'api'); }
    /** Same as `setColumnPinned`, but provide a list of column keys. */
    public setColumnsPinned(keys: (string | Column)[], pinned: string): void { this.columnModel.setColumnsPinned(keys, pinned, 'api'); }

    /**
     * Returns all the grid columns, same as `getColumns()`, except
     *
     *  a) it has the order of the columns that are presented in the grid
     *
     *  b) it's after the 'pivot' step, so if pivoting, has the value columns for the pivot.
     */
    public getAllGridColumns(): Column[] { return this.columnModel.getAllGridColumns(); }
    /** Same as `getAllDisplayedColumns` but just for the pinned left portion of the grid. */
    public getDisplayedLeftColumns(): Column[] { return this.columnModel.getDisplayedLeftColumns(); }
    /** Same as `getAllDisplayedColumns` but just for the center portion of the grid. */
    public getDisplayedCenterColumns(): Column[] { return this.columnModel.getDisplayedCenterColumns(); }
    /** Same as `getAllDisplayedColumns` but just for the pinned right portion of the grid. */
    public getDisplayedRightColumns(): Column[] { return this.columnModel.getDisplayedRightColumns(); }
    /** Returns all columns currently displayed (e.g. are visible and if in a group, the group is showing the columns) for the pinned left, centre and pinned right portions of the grid. */
    public getAllDisplayedColumns(): Column[] { return this.columnModel.getAllDisplayedColumns(); }
    /** Same as `getAllGridColumns()`, except only returns rendered columns, i.e. columns that are not within the viewport and therefore not rendered, due to column virtualisation, are not displayed. */
    public getAllDisplayedVirtualColumns(): Column[] { return this.columnModel.getViewportColumns(); }

    /** Moves a column to `toIndex`. The column is first removed, then added at the `toIndex` location, thus index locations will change to the right of the column after the removal. */
    public moveColumn(key: string | Column, toIndex: number): void {
        if (typeof key === 'number') {
            // moveColumn used to take indexes, so this is advising user who hasn't moved to new method name
            console.warn('AG Grid: you are using moveColumn(fromIndex, toIndex) - moveColumn takes a column key and a destination index, not two indexes, to move with indexes use moveColumnByIndex(from,to) instead');
            this.columnModel.moveColumnByIndex(key as number, toIndex, 'api');
        } else {
            this.columnModel.moveColumn(key, toIndex, 'api');
        }
    }
    /** Same as `moveColumn` but works on index locations. */
    public moveColumnByIndex(fromIndex: number, toIndex: number): void { this.columnModel.moveColumnByIndex(fromIndex, toIndex, 'api'); }
    /** Same as `moveColumn` but works on list. */
    public moveColumns(columnsToMoveKeys: (string | Column)[], toIndex: number) { this.columnModel.moveColumns(columnsToMoveKeys, toIndex, 'api'); }
    /** Move the column to a new position in the row grouping order. */
    public moveRowGroupColumn(fromIndex: number, toIndex: number): void { this.columnModel.moveRowGroupColumn(fromIndex, toIndex); }
    /** Sets the agg function for a column. `aggFunc` can be one of `'min' | 'max' | 'sum'`. */
    public setColumnAggFunc(key: string | Column, aggFunc: string): void { this.columnModel.setColumnAggFunc(key, aggFunc); }
    /** Sets the column width on a single column. The finished flag gets included in the resulting event and not used internally by the grid. The finished flag is intended for dragging, where a dragging action will produce many `columnWidth` events, so the consumer of events knows when it receives the last event in a stream. The finished parameter is optional, and defaults to `true`. */
    public setColumnWidth(key: string | Column, newWidth: number, finished: boolean = true, source?: ColumnEventType): void {
        this.columnModel.setColumnWidths([{ key, newWidth }], false, finished, source);
    }
    /** Sets the column widths on multiple columns. This method offers better performance than calling `setColumnWidth` multiple times. The finished flag gets included in the resulting event and not used internally by the grid. The finished flag is intended for dragging, where a dragging action will produce many `columnWidth` events, so the consumer of events knows when it receives the last event in a stream. The finished parameter is optional, and defaults to `true`. */
    public setColumnWidths(columnWidths: { key: string | Column, newWidth: number }[], finished: boolean = true, source?: ColumnEventType): void {
        this.columnModel.setColumnWidths(columnWidths, false, finished, source);
    }
    /** Set the pivot mode. */
    public setPivotMode(pivotMode: boolean): void { this.columnModel.setPivotMode(pivotMode); }
    /** Get the pivot mode. */
    public isPivotMode(): boolean { return this.columnModel.isPivotMode(); }

    /** @deprecated Use `getPivotResultColumn` instead */
    public getSecondaryPivotColumn(pivotKeys: string[], valueColKey: string | Column): Column | null {
        console.warn('AG Grid: since version 28.0.x getSecondaryPivotColumn has been renamed, please use getPivotResultColumn instead');
        return this.getPivotResultColumn(pivotKeys, valueColKey);
    }

    /** Returns the pivot result column for the given `pivotKeys` and `valueColId`. Useful to then call operations on the pivot column. */
    public getPivotResultColumn(pivotKeys: string[], valueColKey: string | Column): Column | null { return this.columnModel.getSecondaryPivotColumn(pivotKeys, valueColKey); }

    /** Set the value columns. */
    public setValueColumns(colKeys: (string | Column)[]): void { this.columnModel.setValueColumns(colKeys, 'api'); }
    /** Get value columns. */
    public getValueColumns(): Column[] { return this.columnModel.getValueColumns(); }
    /** Remove a value column. */
    public removeValueColumn(colKey: (string | Column)): void { this.columnModel.removeValueColumn(colKey, 'api'); }
    /** Same as `removeValueColumns` but provide a list. */
    public removeValueColumns(colKeys: (string | Column)[]): void { this.columnModel.removeValueColumns(colKeys, 'api'); }
    /** Add a value column. */
    public addValueColumn(colKey: (string | Column)): void { this.columnModel.addValueColumn(colKey, 'api'); }
    /** Same as `addValueColumn` but provide a list. */
    public addValueColumns(colKeys: (string | Column)[]): void { this.columnModel.addValueColumns(colKeys, 'api'); }

    /** Set the row group columns. */
    public setRowGroupColumns(colKeys: (string | Column)[]): void { this.columnModel.setRowGroupColumns(colKeys, 'api'); }
    /** Remove a column from the row groups. */
    public removeRowGroupColumn(colKey: string | Column): void { this.columnModel.removeRowGroupColumn(colKey, 'api'); }
    /** Same as `removeRowGroupColumn` but provide a list of columns. */
    public removeRowGroupColumns(colKeys: (string | Column)[]): void { this.columnModel.removeRowGroupColumns(colKeys, 'api'); }
    /** Add a column to the row groups. */
    public addRowGroupColumn(colKey: string | Column): void { this.columnModel.addRowGroupColumn(colKey, 'api'); }
    /** Same as `addRowGroupColumn` but provide a list of columns. */
    public addRowGroupColumns(colKeys: (string | Column)[]): void { this.columnModel.addRowGroupColumns(colKeys, 'api'); }
    /** Get row group columns. */
    public getRowGroupColumns(): Column[] { return this.columnModel.getRowGroupColumns(); }

    /** Set the pivot columns. */
    public setPivotColumns(colKeys: (string | Column)[]): void { this.columnModel.setPivotColumns(colKeys, 'api'); }
    /** Remove a pivot column. */
    public removePivotColumn(colKey: string | Column): void { this.columnModel.removePivotColumn(colKey, 'api'); }
    /** Same as `removePivotColumn` but provide a list of columns. */
    public removePivotColumns(colKeys: (string | Column)[]): void { this.columnModel.removePivotColumns(colKeys, 'api'); }
    /** Add a pivot column. */
    public addPivotColumn(colKey: string | Column): void { this.columnModel.addPivotColumn(colKey, 'api'); }
    /** Same as `addPivotColumn` but provide a list of columns. */
    public addPivotColumns(colKeys: (string | Column)[]): void { this.columnModel.addPivotColumns(colKeys, 'api'); }
    /** Get the pivot columns. */
    public getPivotColumns(): Column[] { return this.columnModel.getPivotColumns(); }

    /** Same as `getAllDisplayedColumnGroups` but just for the pinned left portion of the grid. */
    public getLeftDisplayedColumnGroups(): IHeaderColumn[] { return this.columnModel.getDisplayedTreeLeft(); }
    /** Same as `getAllDisplayedColumnGroups` but just for the center portion of the grid. */
    public getCenterDisplayedColumnGroups(): IHeaderColumn[] { return this.columnModel.getDisplayedTreeCentre(); }
    /** Same as `getAllDisplayedColumnGroups` but just for the pinned right portion of the grid. */
    public getRightDisplayedColumnGroups(): IHeaderColumn[] { return this.columnModel.getDisplayedTreeRight(); }
    /** Returns all 'root' column headers. If you are not grouping columns, these return the columns. If you are grouping, these return the top level groups - you can navigate down through each one to get the other lower level headers and finally the columns at the bottom. */
    public getAllDisplayedColumnGroups(): IHeaderColumn[] | null { return this.columnModel.getAllDisplayedTrees(); }
    /** Auto-sizes a column based on its contents. */
    public autoSizeColumn(key: string | Column, skipHeader?: boolean): void { return this.columnModel.autoSizeColumn(key, skipHeader, 'api'); }

    /** Same as `autoSizeColumn`, but provide a list of column keys. */
    public autoSizeColumns(keys: (string | Column)[], skipHeader?: boolean): void {
        this.columnModel.autoSizeColumns({ columns: keys, skipHeader: skipHeader });
    }

    /** Calls `autoSizeColumns` on all displayed columns. */
    public autoSizeAllColumns(skipHeader?: boolean): void { this.columnModel.autoSizeAllColumns(skipHeader, 'api'); }

    /** @deprecated Use `setPivotResultColumns` instead. */
    public setSecondaryColumns(colDefs: (ColDef | ColGroupDef)[]): void {
        console.warn('AG Grid: since version 28.0.x setSecondaryColumns has been renamed, please use setPivotResultColumns instead');
        this.setPivotResultColumns(colDefs);
    }
    /** Set the pivot result columns. */
    public setPivotResultColumns(colDefs: (ColDef | ColGroupDef)[]): void { this.columnModel.setSecondaryColumns(colDefs, 'api'); }

    /** @deprecated Use `getPivotResultColumns` instead. */
    public getSecondaryColumns(): Column[] | null {
        console.warn('AG Grid: since version 28.0.x getSecondaryColumns has been renamed, please use getPivotResultColumns instead');
        return this.getPivotResultColumns();
    }
    /** Returns the grid's pivot result columns. */
    public getPivotResultColumns(): Column[] | null { return this.columnModel.getSecondaryColumns(); }

    /** @deprecated Use `getColumns` instead. */
    public getPrimaryColumns(): Column[] | null {
        console.warn('AG Grid: since version 28.0.x getPrimaryColumns has been renamed, please use getColumns instead');
        return this.getColumns();
    }

    @PreDestroy
    private cleanDownReferencesToAvoidMemoryLeakInCaseApplicationIsKeepingReferenceToDestroyedGrid(): void {
        // some users were raising support issues with regards memory leaks. the problem was the customers applications
        // were keeping references to the API. trying to educate them all would be difficult, easier to just remove
        // all references in the API so at least the core grid can be garbage collected.
        //
        // wait about 100ms before clearing down the references, in case user has some cleanup to do,
        // and needs to deference the API first
        setTimeout(_.removeAllReferences.bind(window, this, 'Column API'), 100);
    }

    // below goes through deprecated items, prints message to user, then calls the new version of the same method

    // public getColumnDefs(): (ColDef | ColGroupDef)[] {
    //     this.setColumnGroupOpened(group, newValue);
    //     return null;
    // }

    /** @deprecated Use `getColumns` instead */
    public getAllColumns(): Column[] | null {
        console.warn('AG Grid: since version 28.0.x getAllColumns has been renamed, please use getColumns instead');
        return this.getColumns();
    }
    /** @deprecated columnGroupOpened no longer exists, use setColumnGroupOpened */
    public columnGroupOpened(group: ProvidedColumnGroup | string, newValue: boolean): void {
        console.error('AG Grid: columnGroupOpened no longer exists, use setColumnGroupOpened');
        this.setColumnGroupOpened(group, newValue);
    }
    /** @deprecated hideColumns is deprecated, use setColumnsVisible */
    public hideColumns(colIds: any, hide: any): void {
        console.error('AG Grid: hideColumns is deprecated, use setColumnsVisible');
        this.columnModel.setColumnsVisible(colIds, !hide, 'api');
    }
    /** @deprecated hideColumn is deprecated, use setColumnVisible */
    public hideColumn(colId: any, hide: any): void {
        console.error('AG Grid: hideColumn is deprecated, use setColumnVisible');
        this.columnModel.setColumnVisible(colId, !hide, 'api');
    }
    /** @deprecated setState is deprecated, use setColumnState */
    public setState(columnState: ColumnState[]): boolean {
        console.error('AG Grid: setState is deprecated, use setColumnState');
        return this.setColumnState(columnState);
    }
    /** @deprecated getState is deprecated, use getColumnState */
    public getState(): ColumnState[] {
        console.error('AG Grid: getState is deprecated, use getColumnState');
        return this.getColumnState();
    }
    /** @deprecated resetState is deprecated, use resetColumnState */
    public resetState(): void {
        console.error('AG Grid: resetState is deprecated, use resetColumnState');
        this.resetColumnState();
    }

    /** @deprecated getAggregationColumns is deprecated, use getValueColumns */
    public getAggregationColumns(): Column[] {
        console.error('AG Grid: getAggregationColumns is deprecated, use getValueColumns');
        return this.columnModel.getValueColumns();
    }

    /** @deprecated removeAggregationColumn is deprecated, use removeValueColumn */
    public removeAggregationColumn(colKey: (string | Column)): void {
        console.error('AG Grid: removeAggregationColumn is deprecated, use removeValueColumn');
        this.columnModel.removeValueColumn(colKey, 'api');
    }
    /** @deprecated removeAggregationColumns is deprecated, use removeValueColumns */
    public removeAggregationColumns(colKeys: (string | Column)[]): void {
        console.error('AG Grid: removeAggregationColumns is deprecated, use removeValueColumns');
        this.columnModel.removeValueColumns(colKeys, 'api');
    }
    /** @deprecated addAggregationColumn is deprecated, use addValueColumn */
    public addAggregationColumn(colKey: (string | Column)): void {
        console.error('AG Grid: addAggregationColumn is deprecated, use addValueColumn');
        this.columnModel.addValueColumn(colKey, 'api');
    }
    /** @deprecated addAggregationColumns is deprecated, use addValueColumns */
    public addAggregationColumns(colKeys: (string | Column)[]): void {
        console.error('AG Grid: addAggregationColumns is deprecated, use addValueColumns');
        this.columnModel.addValueColumns(colKeys, 'api');
    }
    /** @deprecated setColumnAggFunction is deprecated, use setColumnAggFunc */
    public setColumnAggFunction(column: Column, aggFunc: string): void {
        console.error('AG Grid: setColumnAggFunction is deprecated, use setColumnAggFunc');
        this.columnModel.setColumnAggFunc(column, aggFunc, 'api');
    }
    /** @deprecated getDisplayNameForCol is deprecated, use getDisplayNameForColumn */
    public getDisplayNameForCol(column: any): string {
        console.error('AG Grid: getDisplayNameForCol is deprecated, use getDisplayNameForColumn');
        return this.getDisplayNameForColumn(column, null);
    }

    /** @deprecated setColumnState is deprecated, use applyColumnState. */
    public setColumnState(columnState: ColumnState[]): boolean {
        console.error('AG Grid: setColumnState is deprecated, use applyColumnState');
        return this.columnModel.applyColumnState({ state: columnState, applyOrder: true }, 'api');
    }

    /** @deprecated getOriginalColumnGroup is deprecated, use getProvidedColumnGroup. */
    public getOriginalColumnGroup(name: string): ProvidedColumnGroup | null {
        console.error('AG Grid: getOriginalColumnGroup is deprecated, use getProvidedColumnGroup');
        return this.columnModel.getProvidedColumnGroup(name);
    }

}


