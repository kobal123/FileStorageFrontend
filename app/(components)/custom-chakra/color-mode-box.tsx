import { forwardRef,Box, Button, BoxProps, useColorMode, chakra, ChakraComponent } from "@chakra-ui/react";
// export const FloatButton = forwardRef<BoxProps, "div">((props, ref) => {
//     const { colorMode } = useColorMode();
  
//     const bgColor = colorMode === 'light' ? 'white' : 'gray.800';
  
    
//     return(
    
//   <Box px="4" py="5" rounded="none" shadow="lg" ref={ref} {...props}>
//     <Button>like this?</Button>
//   </Box>
// )
// });



// export default function ColorModeBox = chakra(Box,(() => {
//     const { colorMode } = useColorMode();
//     const bgColor = colorMode === 'light' ? 'white' : 'gray.800';
  

//     return {
//         baseStyle: {
//             bg: bgColor,
//           }
//     }
// })()
// );
type DivComponent = ChakraComponent<'div', {}>

const ColorModeBox = forwardRef<BoxProps, 'div'>((props, ref) => (
    <Box   ref={ref} {...props} />
  )) as DivComponent;



export default function ColorModeSensitiveBox(props: BoxProps) {
    const { colorMode } = useColorMode();  
    const bg = colorMode === 'light' ? '#F8F6F6' : '#1D1D1D';
    const {bgColor, ...rest } = props;
    return <Box {...rest} bg={bgColor ? bgColor : bg}></Box>
};
