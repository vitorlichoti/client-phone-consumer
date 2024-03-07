import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    Text,
    Flex,
} from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'

function TopBar() {
    const navigate = useNavigate()

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        navigate("/");
    }

    console.log(userInfo.avatar_url);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '100px', marginTop: '20px', widt: '100%' }}>
            <Flex>
                <Text fontSize="lg" fontWeight="bold" color="#7A7A7A">Phone Consumer - </Text>
                <Text fontSize="lg" fontWeight="bold" color="#FFD713" marginLeft={2}>Lexart Challenge</Text>
            </Flex>
            <Menu colorScheme="gray" width="50%">
                <Avatar size="md" src={userInfo?.avatar_url.length > 0 && userInfo?.avatar_url.includes('http') ? userInfo.avatar_url : "https://bit.ly/broken-link"} />
                <MenuButton
                    px={4}
                    py={2}
                    bg='#FFD713'
                    color='#7A7A7A'
                    transition='all 0.2s'
                    borderRadius='md'
                    _hover={{ bg: 'white' }}
                    _expanded={{ bg: '#FFD713' }}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                >
                    {userInfo?.name}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => handleLogout()}>Sair</MenuItem>
                </MenuList>
            </Menu>
        </div>
    )
}

export default TopBar