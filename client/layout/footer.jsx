import '../assets/styles/footer.styl'

export default {
    data() {
        return {
            author: 'Xiao'
        }
    },
    render() {
        return (
            <div id="footer">
                <span>Writing by {this.author}</span>
            </div>
        )
    }
}