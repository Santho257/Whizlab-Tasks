import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';


const Section = ({ children, style, ...rest }) => {
    const { darkTheme } = useContext(ThemeContext);

    const styles = {
        padding: "1rem",
        maxWidth: "1024px",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        position: "relative",
        backgroundColor: darkTheme ? "#23282f" : "#f9f9f9",
        color: darkTheme ? "#ffffff" : "#23282f",
        ...style,
    }
    return (
        <section style={styles} {...rest}>{children}</section>
    )
}

export default Section