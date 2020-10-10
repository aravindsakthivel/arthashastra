import styled from 'styled-components'


export const HomeIcon = styled.img`
    width: 25px;
    height: 25px;
`

export const FormWrapper = styled.div`
    height: 100vh;
    position:fixed;
    background: #8E2DE2;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #4A00E0, #8E2DE2);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #4A00E0, #8E2DE2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

`

export const Mlabel = styled.label`
    @media only screen and (max-width: 600px) {
        font-size:12px;
    }
`