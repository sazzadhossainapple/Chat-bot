import axios from 'axios';

export async function sendMsgToOpenAI(message, key) {
    try {
        const res = await axios.post(
            'https://api.openai.com/v1/engines/text-davinci-003/completions',
            {
                prompt: message,
                max_tokens: 256,
                temperature: 0.7,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${key}`,
                },
            }
        );
        return res.data.choices[0];
    } catch (error) {
        console.error('Error generating text:', error);
        return null;
    }
}
