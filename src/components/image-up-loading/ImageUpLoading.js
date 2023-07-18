
import React, { useState, useEffect } from 'react'
import ImageUploading from 'react-images-uploading'
import IcCloseSmall from '../../assets/icons/ic-closeSmall'
import Icupload from '../../assets/icons/ic-upload'
import styles from './style.module.scss'

function ImageUpLoading(props) {
    const {defaultValue,  imageRef } = props
    const [images, setImages] = React.useState([]);

    useEffect(()=>{
        if(defaultValue){
            setImages([{
                data_url: defaultValue
            }])
        }
    },[defaultValue]);

    const maxNumber = 69;

    const onChange = (imageList, ref) => {
        ref.current['web'] = imageList
        setImages(imageList)
        props.onChange(imageList[0])
    }

    return (
        <ImageUploading
            value={images}
            onChange={(imageList) => onChange(imageList, imageRef)}
            maxNumber={maxNumber}
            dataURLKey="data_url"
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
            }) => {
                return (
                    <div  className={styles.uploadtImg}>
                        {!imageList.length && <div style={{textAlign: 'center'}} className={styles.avatarIc} onClick={onImageUpload}>
                            <div className={styles.icUpload} style={{marginTop: 15}}>
                                <Icupload/>
                            </div>
                            <div className={styles.titleUpload}>
                                <div style={{marginTop: 15}}>
                                    <p style={{color: '#9F9F9F', lineHeight: 1.3, fontStyle: 'italic'}}>Tải ảnh lên từ thiết bị</p>
                                </div>
                            </div>
                        </div>}
                        {imageList.map((image, index) => {
                            return (
                                <div key={index} className={styles.imageItem}onClick={onImageUpload}>
                                    <img style={{width: '100%', height: '100%', objectFit: "contain"}}  src={image['data_url']} alt="" />
                                    <div  className={styles.imageItemDelete} onClick={(e)=>{setImages([]) 
                                        e.stopPropagation();} } >
                                        <IcCloseSmall  />
                                    </div>
                                </div>
                            )
                        })}
                                        
                    </div>
                )
            }}
        </ImageUploading>
    )
}

export default ImageUpLoading
