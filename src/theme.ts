import { createTheme } from "@mui/material";


export const lightBackgroundColor = "#e1e1e1"
export const lightSVGicon = "rgba(224, 202, 31)"
export const lightSecondaryColor = "rgba(200, 200, 200, 0.3)"
export const lightSecondaryBG = "rgba(255, 255, 255, 0.2)"
export const lightBorder = "1px solid rgba(155, 155, 155)"
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: lightSecondaryColor,
        },
        background: {
            default: lightBackgroundColor, // Светлый фон
        },
    },
    components: {
        MuiSelect: {
            defaultProps: {
                style: {
                    borderRadius: "10px",
                    backgroundColor: lightSecondaryBG, // выпадающий список круглый
                    fontFamily: "verdana",
                    fontSize: "small",
                    lineHeight: '1.5rem',
                }
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    // стили для MuiMenu 
                    borderRadius: "10px"
                },
            },
        },
        MuiList: {
            defaultProps: {
                style: { padding: 0 }
            }
        },
        MuiInputBase: {
            defaultProps: {
                style: {
                    backgroundColor: lightSecondaryBG,
                    borderRadius: "10px",
                },
            }
        },
        MuiIconButton: {
            defaultProps: {
                style: {
                    backgroundColor: lightSecondaryBG, padding: -1,
                    border: lightBorder, borderRadius: "20px",
                },
            }
        },
        MuiTypography: {
            defaultProps: {
                style: {
                    fontFamily: "verdana",
                    // letterSpacing: '0.02em',
                    color: 'red'
                },
            }
        },
        MuiButton: {
            defaultProps: {
                style: {
                    border: lightBorder,
                },
            }
        },
    }
})

export const darkBackgroundColor = "rgba(26, 27, 35, 1)"
export const darkSecondaryColor = "rgba(186, 141, 228, 0.07)"
export const darkBorder = "1px solid rgba(255, 255, 255, 0.3)"
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: darkSecondaryColor,
        },
        background: {
            default: darkBackgroundColor, // Темный фон
        },
    },
    components: {
        MuiSelect: {
            defaultProps: {
                style: {
                    borderRadius: "10px",
                    backgroundColor: darkSecondaryColor,
                    fontFamily: "verdana",
                    fontSize: "small",
                    lineHeight: '1.5rem'
                }
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: darkBackgroundColor,
                    borderRadius: "10px"
                },
            },
        },
        MuiList: {
            defaultProps: {
                style: { padding: 0 }
            }
        },
        MuiIconButton: {
            defaultProps: {
                style: {
                    backgroundColor: darkSecondaryColor, padding: -1,
                    border: darkBorder, borderRadius: "20px",
                },
            }
        },
        MuiInputBase: {
            defaultProps: {
                style: {
                    backgroundColor: darkSecondaryColor,
                    borderRadius: "10px",
                },
            }
        },
        MuiTypography: {
            defaultProps: {
                style: {
                    fontFamily: "verdana",
                    // letterSpacing: '0.07em',
                    color: 'rgba(245, 66, 78, 1)'
                },
            }
        },
        MuiButton: {
            defaultProps: {
                style: {
                    // backgroundColor: darkSecondaryColor,
                },
            }
        },
    }
})