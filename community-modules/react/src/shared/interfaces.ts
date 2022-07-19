import {
    ColumnApi,
    GridApi,
    GridOptions,
    ICellEditor,
    ICellRenderer,
    IDate,
    IFilter,
    IFloatingFilter,
    IHeader,
    IHeaderGroup,
    IStatusPanel,
    IToolPanel,
    Module
} from '@ag-grid-community/core';
import { ChangeDetectionStrategyType } from './changeDetectionService';

export interface SharedProps<TData = any> extends GridOptions<TData> {
    gridOptions?: GridOptions<TData>;
    modules?: Module[];
    containerStyle?: any;
    className?: string;
    setGridApi?: (gridApi: GridApi<TData>, columnApi: ColumnApi) => void;
    componentWrappingElement?: string; // only used when putting React into JS
    maxComponentCreationTimeMs?: number; // only used when putting React into JS
}

export interface AgReactUiProps<TData = any> extends SharedProps<TData> {
}

export interface AgGridReactProps<TData = any> extends SharedProps<TData> {
    children?: any;
    rowDataChangeDetectionStrategy?: ChangeDetectionStrategyType;
    disableStaticMarkup?: boolean;  // only used when legacyComponentRendering is true
    legacyComponentRendering?: boolean,
}

export interface AgReactComponent {
    getReactContainerStyle?: () => {};
    getReactContainerClasses?: () => string[];
}

export interface IHeaderGroupReactComp extends IHeaderGroup, AgReactComponent {
}

export interface IHeaderReactComp extends IHeader, AgReactComponent {
}

export interface IDateReactComp extends IDate, AgReactComponent {
}

export interface IFilterReactComp extends IFilter, AgReactComponent {
}

export interface IFloatingFilterReactComp extends IFloatingFilter, AgReactComponent {
}
export interface ICellRendererReactComp extends ICellRenderer, AgReactComponent {
}

export interface ICellEditorReactComp extends ICellEditor, AgReactComponent {
}

export interface ILoadingCellRendererReactComp extends AgReactComponent {
}

export interface ILoadingOverlayReactComp extends AgReactComponent {
}

export interface INoRowsOverlayReactComp extends AgReactComponent {
}

export interface IStatusPanelReactComp extends IStatusPanel, AgReactComponent {
}

export interface IToolPanelReactComp extends IToolPanel, AgReactComponent {
}

export interface ITooltipReactComp extends AgReactComponent {
}

/*
export interface IHeaderGroupReactComp extends IHeaderGroup, AgReactFrameworkComponent<IHeaderGroupParams> {
}

export interface IHeaderReactComp extends IHeader, AgReactFrameworkComponent<IHeaderParams> {
}

export interface IDateReactComp extends IDate, AgReactFrameworkComponent<IDateParams> {
}

export interface IFilterReactComp extends IFilter, AgReactFrameworkComponent<IFilterParams> {
}

export interface ICellRendererReactComp extends ICellRenderer, AgReactFrameworkComponent<ICellRendererParams> {
}

export interface ICellEditorReactComp extends ICellEditor, AgReactFrameworkComponent<ICellEditorParams> {
}

export interface ILoadingCellRendererReactComp extends AgReactFrameworkComponent<ILoadingCellRendererParams> {

}

export interface ILoadingOverlayReactComp extends AgReactFrameworkComponent<ILoadingOverlayParams> {
}

export interface INoRowsOverlayReactComp extends AgReactFrameworkComponent<INoRowsOverlayParams> {
}

export interface IStatusPanelReactComp extends IStatusPanel, AgReactFrameworkComponent<IStatusPanelParams> {
}

export interface IToolPanelReactComp extends IToolPanel, AgReactFrameworkComponent<IToolPanelParams> {
}
*/
