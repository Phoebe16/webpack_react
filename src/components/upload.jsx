import React from 'react';

export default class UploadPic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewPic: ''
        };
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(e) {
        const rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
        if (!rFilter.test(e.target.files[0].type)) return alert('请勿上传图片格式以外的文件！');
        console.log(e.target.files[0]);
        const reader = new FileReader();
        // 读取文件内容，结果用data:url的字符串形式表示
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function(e) {
            console.log(e.target.result);  // 上传的图片的编码
            this.setState({
                previewPic: e.target.result
            });
        }.bind(this);
    }

    render() {
        const { previewPic } = this.state;
        return (
            <div id="upload-pic">
                <input type="file" className="file" onChange={this.handleUpload} />
                <div><img src={previewPic} alt="" style={{width: '70px' }} /></div>
            </div>
        )
    }
}
