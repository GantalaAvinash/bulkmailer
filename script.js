document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const fileInput = document.getElementById('fileInput');
    const progressBarContainer = document.getElementById('progressBarContainer');
    const progressBar = document.getElementById('progressBar');
    const message = document.getElementById('message');

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        const xhr = new XMLHttpRequest();

        // Show progress bar and loading message
        progressBarContainer.style.display = 'block';
        message.textContent = 'Uploading...';

        // Event listener to track upload progress
        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percentage = Math.round((e.loaded / e.total) * 100);
                progressBar.style.width = `${percentage}%`;

                if( percentage == 100 ){
                    message.textContent = 'File Uploaded and Processing...'
                }
            }
        });

        // Event listener to handle upload completion
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                // Hide progress bar after upload
                progressBarContainer.style.display = 'none';
                if (xhr.status === 200) {
                    message.textContent = 'Emails sent successfully';
                } else {
                    message.textContent = 'Failed to send emails';
                }
            }
        };

        xhr.open('POST', 'https://elearning-backend-9i30.onrender.com/tools/mail/upload/');
        xhr.send(formData);
    });

    fileInput.addEventListener('change', () => {
        progressBar.style.width = '0%';
        message.textContent = '';
    });
});

