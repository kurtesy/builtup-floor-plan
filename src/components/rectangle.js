import React from "react";
import { Rect, Transformer, Group } from "react-konva";

const Rectangle = ({ plotProps, builtupProps, isSelected, onSelect, onChange }) => {
  
    const layoutRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
        // we need to attach transformer manually
        trRef.current.setNode(layoutRef.current);
        trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);
    return (
        <React.Fragment>
            <Group
                {...plotProps}
                onClick={onSelect}
                ref={layoutRef}
                onTransformEnd={e => {
                    // transformer is changing scale
                    const node = layoutRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...plotProps,
                        x: node.x(),
                        y: node.y(),
                        width: node.width() * scaleX,
                        height: node.height() * scaleY,
                    });
                    }
                }
                >
                <Rect
                    {...plotProps}
                />
                <Rect
                    {...builtupProps}
                />
            </Group>
            {isSelected && <Transformer ref={trRef} />}
        </React.Fragment>
    );
    };

export default Rectangle;
