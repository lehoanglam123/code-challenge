import { useEffect, useState } from 'react';
import axios from 'axios';
import { Autocomplete, Avatar, TextField } from '@mui/material';

function TokenSelector({ onTokenSelect, selectedToken }) {
    const [loading, setLoading] = useState(true);
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        axios
            .get('https://interview.switcheo.com/prices.json')
            .then((response) => {
                const uniqueTokensMap = new Map();
                response.data.forEach(({ currency, price }, index) => {
                    if (!uniqueTokensMap.has(currency)) {
                        uniqueTokensMap.set(currency, {
                            index,
                            label: currency,
                            icon: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`,
                            price: price || null,
                        });
                    }
                });
                setTokens(Array.from(uniqueTokensMap.values()));
            })
            .catch((error) => console.error('Lỗi khi tải token:', error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Autocomplete
            options={tokens}
            getOptionLabel={(option) => option.label || ''}
            value={selectedToken} // Đảm bảo `value` đúng
            onChange={(event, newValue) => onTokenSelect(newValue)}
            isOptionEqualToValue={(option, value) =>
                option.label === value?.label
            } // Fix lỗi UI không cập nhật
            renderOption={(props, option) => (
                <li {...props} key={option.index}>
                    <Avatar
                        src={option.icon}
                        sx={{ width: 24, height: 24, marginRight: 1 }}
                    />
                    {option.label}
                </li>
            )}
            renderInput={(params) => (
                <TextField {...params} label="Chọn tiền tệ" />
            )}
        />
    );
}

export default TokenSelector;
