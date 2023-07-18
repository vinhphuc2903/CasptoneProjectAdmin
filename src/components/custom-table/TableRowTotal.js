/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from '@emotion/styled';

const RowWrapper = styled.div`
  display: flex;
  overflow: hidden;
  background: white;
  font-weight: 500;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const RowItem = styled.div((props) => ({
  textAlign: props?.align,
  width: props?.width,
  minWidth: props?.width,
  maxWidth: props?.width,
  display: props?.isHidden ? 'none' : 'inline-block',
  lineHeight: '16px',
  fontSize: '14px',
  fontWeight: 500,
  padding: '17px 5px',
  backgroundColor: '#FBFAF4',
  verticalAlign: 'middle',
  height: 50,
  borderRight: props?.borderRight ? 'none' : '1px solid #D1D1D1',
  borderLeft: (props.index === 0 || props?.borderLeft) && '1px solid #D1D1D1',
  borderBottom: props?.borderBottom ? 'none' : '1px solid #D1D1D1',
  position: props?.position,
  left: props?.left,
  zIndex: props?.zIndex,
}));

function TableRowTotal(props) {
  const { dataRowTotal, data = [] } = props;

  return (
    <RowWrapper className="_custom_scroll_sum_row">
      {dataRowTotal && data.length > 0
        ? dataRowTotal?.map((item, index) => {
          const rowProps = {
            align: item.align,
            width: item.width,
            isHidden: item.isHidden,
            borderRight: item.borderRight,
            borderLeft: item.borderLeft,
            borderBottom: item.borderBottom,
            position: item.position,
            left: item.left,
            zIndex: item.zIndex,
          };
          return (
            <RowItem key={index} index={index} {...rowProps}>
              {item?.value}
            </RowItem>
          );
        })
        : null}
    </RowWrapper>
  );
}

export default TableRowTotal;
