import { getDb } from '../mongodb';
import resp from '../../utils/response';

export const createPlayer = async () => {
  const db = getDb();
  
  try {

  } catch (err: Error | any) {
    console.error(err);
    return resp(false, "Error creating player", err.message);
  }
}