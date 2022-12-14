import { Box, Divider, Flex, Heading, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const Navbar: React.FC<{}> = () =>
{
    const router = useRouter();

    return (
        <>
            <Flex justify="space-between" m={4}>
                <Heading onClick={() => router.push('/')} as="button">
                    AlbertQuiz
                </Heading>
                <Box>
                    <Box p={2}>
                        <Link
                            p={2}
                            fontWeight={
                                router.pathname === '/quiz/new' ? 'extrabold' : 'normal'
                            }
                            onClick={() => router.push('/quiz/new')}
                        >
                            Add new quiz
                        </Link>
                        <Link p={2} onClick={() => router.push('/signin')}>
                            Log In
                        </Link>
                    </Box>
                </Box>
            </Flex>
            <Divider
                css={{
                    boxShadow: '1px 1px #888888',
                }}
            />
        </>
    );
};

export default Navbar;
