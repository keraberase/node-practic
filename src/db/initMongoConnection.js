import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/yourdatabase', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Подключение к MongoDB успешно установлено');
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error);
    throw error;
  }
};
