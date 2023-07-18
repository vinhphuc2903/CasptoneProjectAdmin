import $ from 'jquery';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AutoSizer, List, WindowScroller } from 'react-virtualized';
import styles from "./CustomTable.module.scss";
import EmptyTable from "./EmptyTable";
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import PropTypes from 'prop-types';
import TableHeaderCustom from './TableHeaderCustom';
function CustomTable(props) {
    const {
        ElementId,
        data,
        rowHeight,
        onClickRow,
        headerColumn,
        dropdownColumn,
        checkBoxColumn,
        fieldName,
        fieldKey,
        EmptyPops,
        isHaveHeader,
        isScrollWindow,
        isDropDown,
        ComponentDropDown,
        fieldId = "Id",
        isShowCheckBox,
        selectedCheckBox = [],
        sizeCollapse,
        childrenField,
        handleOnCheckBox,
        componentHeadCell,
        dataRowTotal = [],
        borderTable =  false,
        dataHeaderCustom,
        topTotalRow,
        isBorderHeader = false
    } = props
    const [dataHead, setDataHead] = useState([]);
    const collapseArr = {}
    const tableRef = useRef(null);
    var ignoreScrollEvents = false
    const listRef = useRef(null)
    const isSelected = (id) => selectedCheckBox?.findIndex((v) => v == id) !== -1;

    useEffect(() => {
        listRef.current.recomputeRowHeights();
    }, [data])
    useMemo(() => {
        if (headerColumn) {
            let dataNew = [];
            dataNew = headerColumn?.map((v, index) => {
                return {
                    ...v,
                    checked: true,
                };
            });
            setDataHead(dataNew);
        }
    }, [headerColumn]);

    useEffect(() => {
        excuteOnScroll();
    }, [])

    const handleChangeHeader = (e) => {
        setDataHead([...e]);
    };

    const handelClickRow = (e, row) => {
        var text = "";
        text = window.getSelection().toString();
        if (text.length > 0) {
            return;
        } else {
            onClickRow(e, row)
        }
    }

    const updateCollapse = (index, val) => {
        collapseArr[index] = val
        listRef.current.recomputeRowHeights();
    }
    const rowRenderer = ({ index, key, style }) => {
        let row = data[index]
        return <TableRow
            index={index}
            key={row[fieldId]}
            style={style}
            row={row}
            checkBoxColumn={checkBoxColumn}
            dropdownColumn={dropdownColumn}
            dataHead={dataHead}
            isDropDown={isDropDown}
            ComponentDropDown={ComponentDropDown}
            rowHeight={rowHeight}
            isItemSelected={isSelected(row[fieldId])}
            isShowCheckBox={isShowCheckBox}
            updateCollapse={updateCollapse}
            collapseArr={collapseArr}
            childrenField={childrenField}
            fieldId={fieldId}
            handleClickCheckBox={handleClickCheckBox}
            componentHeadCell={componentHeadCell}
            borderTable={borderTable}
            handelClickRow={handelClickRow} />

    };

    const syncScroll = (element1, element2, element3) => {
        document.getElementById(ElementId).addEventListener(
            'scroll',
            function (event) {
                var $elm = $(event.target);
                if ($elm.hasClass(element1)) {
                    var ignore = ignoreScrollEvents
                    ignoreScrollEvents = false
                    if (ignore) { return; }

                    ignoreScrollEvents = true
                    $(`.${element2}`).scrollLeft($(`.${element1}`).scrollLeft())
                    $(`.${element3}`).scrollLeft($(`.${element1}`).scrollLeft())
                }
            },
            true // Capture event
        );
    }
    const excuteOnScroll = () => {
        syncScroll("_custom_scroll_footer", "ReactVirtualized__Grid__innerScrollContainer", "_custom_scroll_header")
        syncScroll("ReactVirtualized__Grid__innerScrollContainer", "_custom_scroll_footer", "_custom_scroll_header")
    }

    const noRowsRenderer = () => {
        return <div className={styles["noRowsRenderer"]}>{EmptyPops}</div>
    }

    const getRowHeight = ({ index }) => {
        if (collapseArr[index]) {
            return rowHeight + sizeCollapse?.itemHeight * (data[index][childrenField].length) + sizeCollapse.overHeight
        }
        return rowHeight;
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            handleOnCheckBox([])
            let dataNew = data?.map((v) => v[fieldId]);
            handleOnCheckBox(dataNew);
        } else {
            handleOnCheckBox([]);
        }
    };

    const handleClickCheckBox = (data) => {
        let params = [...selectedCheckBox];
        let indexCheckBox = params?.findIndex(x => x == data);
        if (indexCheckBox != -1) {
            params.splice(indexCheckBox, 1);
            handleOnCheckBox(params);
        } else {
            params?.push(data);
            handleOnCheckBox(params)
        }
    }

    const getScrollElement = () => {
        if (!isScrollWindow) {
            if (tableRef.current) {
                let scrollElement = tableRef.current.closest(".ScrollPopupBody");
                if (scrollElement) {
                    return scrollElement;
                }
            }
        }
        return document.window
    }

    return (
        <div style={{ fontWeight: 400 }} className="CustomList" id={ElementId} ref={tableRef}>
            {
                <WindowScroller scrollElement={getScrollElement()}>
                    {({ height, scrollTop }) => (
                        <div className="ScrollTable">
                            {!dataHeaderCustom && <TableHeader
                                onChangeHeader={handleChangeHeader}
                                headerColumn={dataHead}
                                checkBoxColumn={checkBoxColumn}
                                dropdownColumn={dropdownColumn}
                                dataDefault={headerColumn}
                                fieldName={fieldName}
                                fieldKey={fieldKey}
                                isHaveHeader={isHaveHeader}
                                onSelectAllClick={handleSelectAllClick}
                                isShowCheckBox={isShowCheckBox}
                                isDropDown={isDropDown}
                                selectedCheckBox={selectedCheckBox}
                                data={data}
                                componentHeadCell={componentHeadCell}
                                borderTable={borderTable}
                            />}
                            {
                                dataHeaderCustom && <TableHeaderCustom Component={dataHeaderCustom} />
                            }
                            {dataRowTotal && (
                                <div
                                    className={`${styles['TableHeader']} _custom_scroll_header`}
                                    style={{
                                        display: 'flex',
                                        overflowX: 'hidden',
                                        background: 'white',
                                        fontWeight: 500,
                                        zIndex: 1,
                                        // top: topTotalRow
                                    }}
                                >
                                    {data.length > 0
                                        ? dataRowTotal?.map((item, index) => (
                                            <div
                                                style={{
                                                    width: item?.width,
                                                    minWidth: item?.width,
                                                    maxWidth: item?.width,
                                                    display: 'inline-block',
                                                    lineHeight: '16px',
                                                    fontSize: '14px',
                                                    fontWeight: 500,
                                                    padding: '17px 10px',
                                                    backgroundColor: '#FBFAF4',
                                                    verticalAlign: 'middle',
                                                    height: 50,
                                                    borderRight: item?.borderRight ? "none" : '1px solid #D1D1D1',
                                                    borderLeft: (index == 0 || item?.borderLeft) && '1px solid #D1D1D1',
                                                    textAlign: item?.align ?? 'left',
                                                    borderTop: isBorderHeader && '1px solid #D1D1D1'
                                                }}
                                            >
                                                {item?.value}
                                            </div>
                                        ))
                                        : null}
                                </div>
                            )}
                            <AutoSizer disableHeight>
                                {({ width }) => (
                                    <List
                                        ref={listRef}
                                        className="_custom_scroll_body"
                                        autoHeight
                                        height={height}
                                        width={width}
                                        scrollTop={scrollTop}
                                        rowHeight={getRowHeight}
                                        rowRenderer={rowRenderer}
                                        rowCount={data?.length}
                                        overscanRowCount={5}
                                        containerStyle={{ overflowX: "auto" }}
                                        noRowsRenderer={noRowsRenderer}
                                    />
                                )}
                            </AutoSizer>
                            <TableFooter
                                headerColumn={dataHead}
                                fieldName={fieldName}
                                fieldKey={fieldKey}
                                checkBoxColumn={checkBoxColumn}
                                dropdownColumn={dropdownColumn}
                                dataDefault={headerColumn}
                                isShowCheckBox={isShowCheckBox}
                                isDropDown={isDropDown}
                            />
                        </div>
                    )}

                </WindowScroller>
            }
        </div>
    )
}
CustomTable.defaultProps = {
    dropdownColumn: {
        isShowDropdownColumn: true,
        minWidth: 44
    },
    checkBoxColumn: {
        isShowCheckBoxColumn: true,
        minWidth: 44
    },
    fieldName: 'label',
    fieldKey: 'id',
    EmptyPops: <EmptyTable />,
    sizeCollapse: {
        itemHeight: 50,
        overHeight: 75
    },
    isDropDown: false,
    isScrollWindow: true,
    ElementId: 'CustomList',
    rowHeight: 50,
    childrenField: 'ChildProducts',
    componentHeadCell: null
}

CustomTable.propTypes = {
    handleOnCheckBox: PropTypes.func,
    onClickRow: PropTypes.func,
    selectedCheckBox: PropTypes.array,
    fieldKey: PropTypes.string,
    fieldName: PropTypes.string,
    childrenField: PropTypes.string,
    isShowCheckBox: PropTypes.bool,
    headerColumn: PropTypes.array,
    data: PropTypes.array,
    componentHeadCell: PropTypes.element
}
export default CustomTable;