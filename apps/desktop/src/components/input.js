import React from "react";
import { css } from "@emotion/react";
import AutoAdjustingHeightTextArea from "./auto-adjusting-height-textarea.js";

let id = 0;
const genId = () => {
  return ++id;
};

const Input = React.forwardRef(
  (
    {
      size,
      multiline = false,
      contrast,
      label,
      hint,
      containerProps,
      labelProps,
      ...props
    },
    ref
  ) => {
    const [id] = React.useState(() => genId());

    const Component = multiline ? AutoAdjustingHeightTextArea : "input";

    const renderInput = (extraProps) => (
      <Component
        ref={ref}
        autoComplete="off"
        css={(t) =>
          css({
            "--bg-regular": t.colors.inputBackground,
            "--bg-contrast":
              t.colors.inputBackgroundContrast ?? t.colors.inputBackground,
            display: "block",
            color: t.colors.textNormal,
            background: t.colors.inputBackground,
            fontSize: "1.5rem",
            fontWeight: "400",
            borderRadius: "0.3rem",
            width: "100%",
            maxWidth: "100%",
            outline: "none",
            border: 0,
            "::placeholder": { color: t.colors.inputPlaceholder },
            "&:disabled": { color: t.colors.textMuted },
            "&:focus-visible": { boxShadow: t.shadows.focus },
            // Prevents iOS zooming in on input fields
            "@supports (-webkit-touch-callout: none)": { fontSize: "1.6rem" },
          })
        }
        style={{
          background: contrast ? "var(--bg-contrast)" : "var(--bg-regular)",
          padding: size === "large" ? "0.7rem 0.9rem" : "0.5rem 0.7rem",
        }}
        {...props}
        {...extraProps}
      />
    );

    if (label == null && hint == null) return renderInput();

    return (
      <div {...containerProps}>
        {label != null && (
          <label
            htmlFor={id}
            css={(t) =>
              css({
                display: "inline-block",
                color: t.colors.textDimmed,
                fontSize: t.fontSizes.default,
                lineHeight: 1.2,
                margin: "0 0 0.8rem",
              })
            }
            {...labelProps}
          >
            {label}
          </label>
        )}
        {renderInput({ id })}
        {hint != null && (
          <div
            css={(t) =>
              css({
                fontSize: t.fontSizes.small,
                color: t.colors.textDimmed,
                marginTop: "0.7rem",
              })
            }
          >
            {hint}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
