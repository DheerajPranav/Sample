import tensorflow as tf


def load_models():
    models = {
        'inception': tf.keras.models.load_model('models/inception_model.h5'),
        'resnet': tf.keras.models.load_model('models/resnet_model.h5'),
        'vgg': tf.keras.models.load_model('models/vgg_model.h5')
    }
    return models


models = load_models()
