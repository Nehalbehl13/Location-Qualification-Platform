function handleButtonClick(option) {
    switch(option) {
        case 'eva':
            alert('EVA button clicked!');
            break;
        case 'facility':
            alert('Facility Provider button clicked!');
            break;
        case 'zeroDemand':
            alert('Null Demand button clicked!');
            break;
        case 'ecoMap':
            
            break;
        case 'others':
            alert('Others button clicked!');
            break;
        default:
            alert('Unknown option');
    }
}
