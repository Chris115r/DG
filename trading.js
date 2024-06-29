class PaperTrading {
    // Other methods ...

    closeTrade(tradeId, interaction) {
        const trade = this.trades[tradeId];
        if (!trade) {
            throw new Error('Trade not found.');
        }

        const userId = trade.userId;
        const userTrades = this.players[userId]?.trades;
        if (userTrades) {
            const index = userTrades.indexOf(tradeId);
            if (index !== -1) {
                userTrades.splice(index, 1);
            }
        }

        delete this.trades[tradeId];
        this.availableTradeIds.push(tradeId);

        const timestamp = new Date().toLocaleString('en-US', { hour12: true });

        this.saveJSON('trades.json', this.trades);
        this.saveJSON('players.json', this.players);
        this.saveJSON('availableTradeIds.json', this.availableTradeIds);

        const tradeLogChannel = interaction.guild.channels.cache.find(channel => channel.name === 'trade-log');
        if (tradeLogChannel) {
            const embed = new EmbedBuilder()
                .setTitle('Trade Closed')
                .setDescription(`Trade ID: ${tradeId}\nUser ID: ${userId}\nSymbol: ${trade.symbol}\nAmount: ${trade.amount}\nStatus: Closed\nTime of Confirmation: ${trade.timestamp}\nTime of Exit: ${timestamp}`)
                .setColor('#FF0000');
            tradeLogChannel.send({ embeds: [embed] });
        }
    }

    // Other methods ...
}

module.exports = PaperTrading;
