import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import LongButton from '../component/LongButton';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AlertModal from '../component/AlertModal';
import { useEmail } from '../context/EmailContext';


export default function LoginEmail({navigation}) {
    const [inputEmail, setInputEmail] = useState('');
    const [isValid, setIsValid] = useState(false); // 버튼 활성화 비활성화 + 이메일이 유효한지 check
    const { setEmail } = useEmail();

    const [showModal, setShowModal] = useState(false);

    const validateEmail = (text) => {
        setInputEmail(text);
        // 이메일 정규표현식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // 이메일이 유효하면 true, 아니면 false
        setIsValid(emailRegex.test(text));
    }

    // //이메일 전송 핸들러 함수
    const handleConfirm = () => {
        setEmail(inputEmail); // 전역에 저장
        setShowModal(false);
        navigation.navigate('LoginPassword'); // 굳이 props로 email을 넘길 필요가 없다.
    }
    return (
        <>
        <KeyboardAvoidingView 
            behavior='height' // 안드로이드 전용 설정
            style={styles.container}
        > 
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {/*아이콘*/}
                    <LinearGradient 
                          colors={["#B28EF8", "#F476E5"]}
                          start= { {x: 0, y: 0.5}}
                          end= { {x: 1, y: 0.5}}
                          style={styles.iconContainer}>
                        <FontAwesome name='envelope' size={30} color='white'/>
                    </LinearGradient>

                    {/*타이틀*/}
                    <Text style={styles.titleText}>이메일 주소를 입력해주세요</Text>

                    <TextInput
                        style={styles.input} 
                        placeholder='sample@example.com'
                        placeholderTextColor='#B3B3B3'
                        keyboardType='email-address' // 이메일 키보드 사용
                        autoCapitalize='none' // 첫 글자 대문자 방지
                        autoCorrect={false} // 자동 수정 방지
                        onChangeText={validateEmail} // 입력 값이 들어오면 이메일 검사를 진행한다.
                        value={inputEmail}
                    />
                    <View style={styles.forgotContainer}>
                        <TouchableOpacity onPress={() => {setShowModal(true)}} style={styles.forgotButton}>
                        <Text style={{color: '#B19ADE', fontSize: 12, textAlign: 'right'}}>이메일을 잊으셨나요?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* 모달 컴포넌트 */}
                    <AlertModal
                    visible={showModal}
                    message={`본인 인증이 필요한 서비스입니다.\n계속하시겠습니까?`}
                    onCancel={() => setShowModal(false)}
                    onConfirm={() => {handleConfirm}}
                    />

                    <View 
                    style={[!isValid && styles.disabledButton]} 
                    pointerEvents={!isValid ? "none" : "auto"}>
                        <LongButton 
                        onPress={handleConfirm}
                        // 이메일이 올바르게 작성되지 않으면 비활성화
                        disabled={!isValid}// 비활성 상태일 때 스타일 변경
                        >
                            <Text style={styles.text}>확인</Text>
                        </LongButton>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5', // 배경색 추가
    },
    inner: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#A078C2', // 보라색 원 배경
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#B3B3B3',
        paddingVertical: 10,
        marginBottom: 40, // 버튼과의 간격 추가
        color: '#000',
    },
    text: {
        color: "white",
        fontSize: 16,
    },
    titleText: {
        marginBottom: 16,
    },
    // button: {
    //     opacity: 1
    // },
    disabledButton: { // 버튼 비활성화 상태이 때 투명도 적용
        opacity: 0.5,
    },
    forgotContainer: {
        width: '100%', // 전체 너비 차지
        paddingLeft: 20, // 왼쪽 여백 추가
        marginBottom: 16
      },
      forgotButton: {
        alignItems: 'flex-end', //오른쪽 정렬
      },
});