import React from "react";
import { css } from "@emotion/react";
import { useAuth } from "@shades/common/app";
import { Home as HomeIcon } from "@shades/ui-web/icons";
import NavBar from "./nav-bar.js";

const LoginScreen = React.lazy(() => import("./login-screen"));

const EmptyHome = () => {
  const { status: authStatus } = useAuth();

  return (
    <div
      css={(theme) =>
        css({
          flex: 1,
          minWidth: 0,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: theme.colors.backgroundPrimary,
        })
      }
    >
      <NavBar />
      {authStatus === "not-authenticated" ? (
        <LoginScreen
          showThrowawayWalletOption={window.location.search.includes(
            "throwaway"
          )}
        />
      ) : (
        <div
          css={css({
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          })}
        >
          <div
            css={css({
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            })}
          >
            <HomeIcon
              css={(t) =>
                css({
                  width: "6rem",
                  color: t.colors.backgroundModifierHover,
                })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyHome;
