const ReorderButtons = ({ index, datasetsLength, reorderCallback }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <button disabled={index - 1 < 0} onClick={() => reorderCallback(index, index - 1)}>
                ↑
            </button>
            <button disabled={index + 1 > datasetsLength - 1} onClick={() => reorderCallback(index, index + 1)}>
                ↓
            </button>
        </div>
    )
}

export default ReorderButtons
