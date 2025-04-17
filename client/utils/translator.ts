import axios from "axios";

const translator = async (text: string, from: string, to: string) => {
  try {
    const {data} = await axios.get(`/api/translate?text=${text}&from=${from}&to=${to}`);
    return data.translated;
  } catch (error) {
    console.log(error)
    return error
  }
  };
export default translator