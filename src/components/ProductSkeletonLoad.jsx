import { Box } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

export const ProductSkeletonLoad = () => {
    return (
        <>
            <Box width={340} marginRight={0.5} my={5}>
                <Skeleton variant="rect" width={320} height={320} />
            </Box>
            <Box width={340} marginRight={0.5} my={5}>
                <Skeleton variant="rect" width={320} height={320} />
            </Box>
            <Box width={340} marginRight={0.5} my={5}>
                <Skeleton variant="rect" width={320} height={320} />
            </Box>
            <Box width={340} marginRight={0.5} my={5}>
                <Skeleton variant="rect" width={320} height={320} />
            </Box>
            <Box width={340} marginRight={0.5} my={5}>
                <Skeleton variant="rect" width={320} height={320} />
            </Box>
        </>
    );
};
