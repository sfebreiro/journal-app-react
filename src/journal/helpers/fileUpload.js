export const fileUpload = async (file) => {
    if (!file) throw new Error('El archivo no se encuentra');

    const cloudURL = 'https://api.cloudinary.com/v1_1/widget/upload';
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        });

        if (!resp) throw new Error('La imagen no se ha podido subir');

        const cloudResp = await resp.json();
        return cloudResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}