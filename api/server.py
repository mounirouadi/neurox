from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import zipfile
import os
import base64
import neurox as nx
import shutil


def zip_folder(folder_path, output_path):
    # Create a ZIP file object in write mode
    with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Iterate over all files and subdirectories in the folder
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                file_path = os.path.join(root, file)
                # Add the file to the ZIP archive with its relative path
                zipf.write(file_path, os.path.relpath(file_path, folder_path))


app = Flask(__name__)
CORS(app)


@app.route('/compress_model', methods=['POST'])
def compress_model():
    # Save the received model file
    model_file = request.files['model']
    model_path = 'neurox.zip'
    model_file.save(model_path)

    # Convert the model to HDF5 format
    nx.translator.translate(model_path, 'hdf5', "")

    # Compress the neurox folder to a ZIP file
    zip_folder("neurox", "neurox.zip")

    # Create a FormData-like response
    with open(model_path, 'rb') as file:
        file_data = file.read()

    # Encode the file data as a Base64 string
    file_data_base64 = base64.b64encode(file_data).decode('utf-8')

    response = jsonify({
        'file': file_data_base64,
        'name': model_path,
        'content_type': "application/zip",
        'size': os.path.getsize(model_path)
    })
    response.headers['Content-Disposition'] = f'attachment; filename="{model_file.filename}"'
    response.headers['Content-Type'] = model_file.content_type
    shutil.rmtree('neurox')
    os.remove('neurox.zip')
    return response


if __name__ == '__main__':
    app.run()
