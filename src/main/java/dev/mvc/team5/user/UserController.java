package dev.mvc.team5.user;
import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    /** 회원가입 */
    @PostMapping("/register")
    public String register(@RequestBody UserDTO userDTO) {
        JSONObject json = new JSONObject();
        if (userService.checkID(userDTO.getUserId())) {
            json.put("sw", false);
            json.put("msg", "중복된 ID입니다.");
        } else {
            userService.create(userDTO);
            json.put("sw", true);
            json.put("msg", "회원가입 완료!");
        }
        return json.toString();
    }
    /** 아이디 중복확인 */
    @GetMapping("/checkId")
    public ResponseEntity<Map<String, Object>> checkId(@RequestParam(name="userId", defaultValue = "") String userId) {
        boolean isDuplicated = userService.checkID(userId);

        Map<String, Object> result = new HashMap<>();
        if (isDuplicated) {
            result.put("sw", false);  // 중복이면 sw = false (사용 불가)
            result.put("msg", "중복된 ID입니다.");
        } else {
            result.put("sw", true);   // 중복 아니면 sw = true (사용 가능)
            result.put("msg", "사용 가능한 ID입니다.");
        }
        return ResponseEntity.ok(result);
    }

    /** 로그인 */
    @PostMapping("/login")
    public String login(@RequestBody UserDTO userDTO, HttpSession session) {
        JSONObject json = new JSONObject();
        boolean success = userService.login(userDTO, session);
        if (success) {
            UserDTO loginUser = userService.getUserById(userDTO.getUserId());
            session.setAttribute("userno", loginUser.getUserno());
            session.setAttribute("username", loginUser.getUsername()); // 이름
            session.setAttribute("schoolname", loginUser.getSchoolId());

            json.put("sw", true);
            json.put("msg", "로그인 성공!");
            json.put("userno", loginUser.getUserno());
            json.put("username", loginUser.getUsername());
        } else {
            json.put("sw", false);
            json.put("msg", "로그인 실패!");
        }
        return json.toString();
    }

    /** 세션 확인 */
    @GetMapping("/session")
    public String getSessionUser(HttpSession session) {
        JSONObject json = new JSONObject();
        Long userno = (Long) session.getAttribute("userno");
        String username = (String) session.getAttribute("username");

        if (userno == null) {
            json.put("sw", false);
            json.put("msg", "로그인 상태가 아닙니다.");
        } else {
            json.put("sw", true);
            json.put("userno", userno);
            json.put("username", username);
        }
        return json.toString();
    }

    /** 로그아웃 */
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        JSONObject json = new JSONObject();
        json.put("sw", false); // sw = false로 초기화 (로그아웃 상태)
        json.put("msg", "로그아웃 완료!");
        return json.toString();
    }

    /** 회원 정보 수정 */
    @PutMapping("/update")
    public String update(@RequestBody UserDTO userDTO, HttpSession session) {
        Long userno = (Long) session.getAttribute("userno");
        userService.updateProfile(userno, userDTO);
        JSONObject json = new JSONObject();
        json.put("sw", true);
        json.put("msg", "회원정보 수정 완료!");
        return json.toString();
    }

    /** 회원 탈퇴 */
    @DeleteMapping("/delete")
    public String delete(HttpSession session) {
        Long userno = (Long) session.getAttribute("userno");
        userService.delete(userno);
        session.invalidate();
        JSONObject json = new JSONObject();
        json.put("sw", true);
        json.put("msg", "회원 탈퇴 완료!");
        return json.toString();
    }

}