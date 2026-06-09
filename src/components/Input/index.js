import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";

export function Input({ value, onChangeText, placeholder, keyboardType, label, secureTextEntry, autoCapitalize = "none" }) {
    return (
        <View style={styles.container}>
            {/* Só renderiza a margem e o texto se a label for passada */}
            {label ? <Text style={styles.label}>{label}</Text> : null}
            
            <TextInput
                style={styles.input}
                placeholder={placeholder || ""}
                placeholderTextColor={'#94a3b8'}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize} 
                autoCorrect={false}
            />
        </View>
    );
}