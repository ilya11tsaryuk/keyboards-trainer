import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#3f51b5',
        },
        secondary: {
          main: '#f50057',
        },
        background: {
          default: '#f5f5f5', // Светлый фон
        },
      },
    components: {
      MuiSelect: {
        defaultProps: {
          style: {
            borderRadius: "20px",
          }
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            // стили для MuiMenu 
            borderRadius: "20px"
          },
        },
      },
      MuiList: {
        defaultProps: {
          style: { padding: 0 }
        }
      },
    //   MuiButton: {
    //     defaultProps: {
    //       style: { color: 'black' }
    //     }
    //   },
    }
  })


export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
          main: '#3f51b5',
        },
        secondary: {
          main: '#f50057',
        },
        background: {
          default: '#121212', // Темный фон
        },
      },
    components: {
      MuiSelect: {
        defaultProps: {
          style: {
            borderRadius: "20px",
          }
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            // стили для MuiMenu 
            borderRadius: "20px"
          },
        },
      },
      MuiList: {
        defaultProps: {
          style: { padding: 0 }
        }
      },
    //   MuiButton: {
    //     defaultProps: {
    //       style: { color: 'white' }
    //     }
    //   },
    }
  })