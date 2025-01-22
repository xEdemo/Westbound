const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// stockCompanySchema                   TODO: ADD whatever to ENUMJS

const StockCompanySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    logo: {             // path to image
        type: String
    },
    tickerSymbol: {
        type: String,
        required: true,
        unique: true,
    },
    sector: {
        type: String,
        requied: true,
    },
    marketCap: {                // total market value of companys share
        type: Number,       // in USD or Gold depending
        required: true,
    },  
    dividendYield: {            // annual dividend payments as a percentage of stock rpice
        type: Number,
        required: true,
    },
    peRatio: {                  // price to earnings ratio
        type: number,
        required:true,
    },
    earningsPerShare: {
        type: Number,
        required: true,
    },



});

// StochSchema

const StockSchema = new Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stockCompany',
    },
    tickerSymbol: {
        type: String,
        required: true,
    },
    currentPrice: {
        type: Number,
    },
    openPrice: {
        type: Number,           //The stock price when the market opens for trading each day.
    },
    closePrice: {
        type: Number,           // The stock price when the market closes for trading each dya
    },
    highPrice: {
        type: Number,           // The highest price the stock reached in a given day
    },
    lowPrice: {
        type: Number,           // The lowest price the stock reached in a given day
    },
    marketCap: {
        type: Number,
    },
    volume: {
        type: Number,           // The number of shares traded in a single day
    },
    priceHistory: [{
        date: { 
            type: Date, 
            required: true,
        },
        price: { 
            type: Number, 
            required: true,
        },
    }],
    dividends: [{           // Dividend payout 
        date: { 
            type: Date, 
            required: true, 
        },
        amount: { 
            type: Number, 
            required: true 
        },                           
      }],
});

// marketDataSchema         // market Stats, TODO: Implement further logging
const MarketDataSchema = new Schema({
    indexName: {
        type: String, // possible enum of different stock market indexs - for now just One but easy to upscale
    },
    indexValue: {
        type: Number,       // needs to pull and ref the current value of the index 
    },
    dailyChange: {      // tracks the daily change of each market per day - idk how it tracks when a day has passed
        type: Number,
    },
    topGainers: {           // tracks ones with biggest daily gains
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stock',
    },
    topLosers: {            // tracks ones with biggest daily losses
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stock',
    },
});

// transactionSchema

const TransactionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    stock: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stock',
    },
    type: {
        type: String,
        enum: [
            'buy',
            'sell',
        ],
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
    currencySpent: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    },
})
// portfolioSchema
// Portfolio Schema
const PortfolioSchema = new Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',   // Reference to who owns the portfolio
        required: true,
    },
    holdings: [{
        stock: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock',  // Reference to the stock owned
            required: true,
        },
        quantity: {
            type: Number,  // Number of shares  owned
            required: true,
            min: 0
        },
        averagePurchasePrice: {
            type: Number,  // Average price per share when bought
            required: true,
        },
        totalInvestment: {
            type: Number,  // Total gold spent on this stock
            required: true,
        },
        purchaseDate: {
            type: Date,  // Date when the stock was purchased
            required: true,
            default: Date.now
        }
    }],
    totalValue: {
        type: Number,  // Current total value of all holdings in gold
        required: true,
        default: 0
    },
    totalInvested: {
        type: Number,  // Total amount of gold invested across all holdings
        required: true,
        default: 0
    },
    availableGold: {
        type: Number,  // Amount of gold available for new investments
        required: true,
        default: 0
    },
    transactions: [{
        type: {
            type: String,
            enum: ['buy', 'sell'],  // Indicates whether the transaction was a buy or sell
            required: true,
        },
        stock: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock',  // Reference to the stock being transacted
            required: true,
        },
        quantity: {
            type: Number,  // Number of shares involved in the transaction
            required: true,
        },
        pricePerShare: {
            type: Number,  // Price per share at the time of the transaction
            required: true,
        },
        totalValue: {
            type: Number,  // Total gold value of the transaction
            required: true,
        },
        date: {
            type: Date,  // Date of the transaction
            required: true,
            default: Date.now
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('StockCompany', StockCompanySchema);
module.exports = mongoose.model('Stock', StockSchema);
module.exports = mongoose.model('Transaction', TransactionSchema);
module.exports = mongoose.model('MarketData', MarketDataSchema);
module.exports = mongoose.model('Portfolio', PortfolioSchema);