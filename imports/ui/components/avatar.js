import React, { useState } from "react";
import { Avatar, Button } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import styled from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';

const SContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: ${props => props.outilined ? '1px solid #ccc' : 'none'};
    border-radius: 5px;
    padding: ${props => props.outilined ? '10px' : '0'};
    margin-bottom: 10px;
`;
const StyledLabel = styled.label`
    display: block;
    cursor: pointer;
    margin-bottom: 10px;
`;
const SButtonContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 0 10px;
`;


export const AppAvatar = ({ previewSrc, setPreviewSrc,  src, alt, size = 100, sx, outilined, onImageUpload, ...restProps }) => {

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return
    
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewSrc(reader.result);
        };
        reader.readAsDataURL(file);
        if (onImageUpload)  onImageUpload(file);
    };

    const handleDeleteImage = () => {
        setPreviewSrc(null);
        if (onImageUpload)  onImageUpload(null);
    };

    return (
        <SContainer outilined={outilined}>
            <Avatar
                alt={alt}
                src={previewSrc || src}
                sx={{ width: size, height: size, cursor: "pointer", ...sx }}
                {...restProps}
            />
            <SButtonContainer>
                <StyledLabel>
                    <Button 
                        style={{display:'flex',justifyContent:'left'}} 
                        startIcon={<PhotoCamera />} 
                        component="span" 
                        variant="contained"
                    >
                        Carregar Foto
                    </Button>
                    <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                </StyledLabel>
                <Button 
                    style={{display:'flex',justifyContent:'left', backgroundColor: 'red', color: 'white'}} 
                    startIcon={<DeleteIcon />} 
                    component="span" 
                    variant="contained" 
                    onClick={handleDeleteImage}
                >
                    Deletar Foto      
                </Button>
            </SButtonContainer>
        </SContainer>
    );
};
