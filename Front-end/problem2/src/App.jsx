import SwapVertIcon from '@mui/icons-material/SwapVert';
import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import './App.css';
import TokenSelector from './components/TokenSelector';

const options = ['Option 1', 'Option 2'];
function App() {
    const [amount, setAmount] = useState('');
    const [fromToken, setFromToken] = useState('');
    const [toToken, setToToken] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [error, setError] = useState(false);

    const handleAmountChange = (e) => {
        const value = e.target.value;

        // Kiểm tra nếu giá trị chỉ chứa số hoặc số thập phân
        if (/^\d*\.?\d*$/.test(value)) {
            setAmount(value);
        } else {
            setError(true); // Đánh dấu lỗi nếu giá trị không hợp lệ
        }
    };

    const handleConvert = () => {
        if (!fromToken || !toToken || !amount) {
            alert('Vui lòng nhập số lượng và chọn token!');
            return;
        }
        if (!fromToken.price || !toToken.price) {
            alert('Không tìm thấy giá của token!');
            return;
        }
        // Convert amount from fromToken to toToken
        const result = (amount * fromToken.price) / toToken.price;
        setConvertedAmount(result.toFixed(6));
    };
    const handleSwap = () => {
        setFromToken((prevFrom) => {
            setToToken(prevFrom);
            return toToken;
        });
    };
    return (
        <>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Hoán đổi tiền tệ
            </Typography>
            <div className="container">
                <TextField
                    label="Số Lượng"
                    value={amount}
                    onChange={handleAmountChange}
                    error={error}
                    helperText={error ? 'Chỉ được nhập số!' : ''}
                />
                <TokenSelector onTokenSelect={setFromToken} />
                <Button variant="outlined" onClick={handleSwap}>
                    <SwapVertIcon />
                </Button>
                <TokenSelector onTokenSelect={setToToken} />
            </div>
            <Button variant="contained" onClick={handleConvert}>
                Chuyển đổi
            </Button>
            {convertedAmount !== null && (
                <Typography sx={{ marginTop: 2 }}>
                    Kết quả: {amount} {fromToken?.label} ≈ {convertedAmount}{' '}
                    {toToken?.label}
                </Typography>
            )}
        </>
    );
}

export default App;
