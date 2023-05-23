import {extendBaseTheme} from "@chakra-ui/react";
import chakraTheme from '@chakra-ui/theme'

const {Button} = chakraTheme.components

const chakraBaseTheme = extendBaseTheme({
    components: {
        Button
    }
})
export default chakraBaseTheme