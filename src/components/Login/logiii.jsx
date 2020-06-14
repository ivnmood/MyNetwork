// import React from "react";
// import {Field, reduxForm} from "redux-form";
// import {required} from "../../utils/vlidators/validators";
// import {login} from "../../redux/AuthReducer";
// import {connect} from "react-redux";
// import {Redirect} from "react-router-dom";
// import 'antd/dist/antd.css';
// import { Form, Input, Button, Checkbox } from 'antd';
//
//
//
//
// const layout = {
//     labelCol: {
//         span: 8,
//     },
//     wrapperCol: {
//         span: 16,
//     },
// };
// const tailLayout = {
//     wrapperCol: {
//         offset: 8,
//         span: 16,
//     },
// };
//
// const LoginForm1 = ({handleSubmit, error, captchaUrl}) => {
//     return (
//             <Form onSubmit={handleSubmit}
//             {...layout}
//             name="basic"
//             initialValues={{
//                 remember: true,
//             }}>
//                 <Form.Item
//                     label="Email"
//                     name="email"
//                     rules={[
//                         {
//                             required: true,
//                             message: 'Please input your email!',
//                         },
//                     ]}>
//             <div>
//                 <Field name={"email"}
//                        placeholder={"email"}
//                        component={<Input/>}
//                 />
//             </div>
//                 </Form.Item>
//
//                 <Form.Item
//                     label="Password"
//                     name="password"
//                     rules={[
//                         {
//                             required: true,
//                             message: 'Please input your password!',
//                         },
//                     ]}
//                 >
//                     <div>
//                         <Field name={"password"}
//                                placeholder={"password"}
//                                component={<Input.Password/>}
//                                type={"password"}
//                         />
//                     </div>
//                 </Form.Item>
//
//
//                 <Form.Item {...tailLayout} name="remember" valuePropName="checked">
//                     <Field name={"rememberMe"}
//                            type={"checkbox"}
//                            component={<Checkbox/>}
//                     />
//                 </Form.Item>
//
//
//
//             {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
//             {captchaUrl && <Field name={"captcha"}
//                                   placeholder={"Symbols from image"}
//                                   component={Input}
//                                   validate={[required]}
//             />}
//
//             {/*<div>*/}
//             {/*    {error && <div className={s.error}>*/}
//             {/*        {error}*/}
//             {/*    </div>}*/}
//             {/*</div>*/}
//             <div>
//                 <Form.Item {...tailLayout}>
//                     <Button type="primary" htmlType="submit">
//                         Submit
//                     </Button>
//                 </Form.Item>
//             </div>
//         </Form>
//     )
// }
//
//
// const LoginReduxForm = reduxForm({
//     form: 'login',
// })(LoginForm1)
//
// const Login = (props) => {
//     const onSubmit = (formData) => {
//         props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
//     }
//     if (props.isAuth) {
//         return <Redirect to={"/profile"}/>
//     }
//     return (
//         <div>
//             <h1>Login</h1>
//             <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
//         </div>
//     )
// }
//
// const mapStateToProps = (state) => ({
//     captchaUrl: state.auth.captchaUrl,
//     isAuth: state.auth.isAuth
// })
//
//
// export default connect(mapStateToProps, {login})(Login);